"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let useWebGL = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let particleTexture: THREE.CanvasTexture | null = null;
    let particleMaterial: THREE.PointsMaterial | null = null;
    let points: THREE.Points | null = null;
    let animationFrameId: number;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scroll tracker
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Mouse coordinates tracker for parallax shifting
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.targetY = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    try {
      // Scene & Camera setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      
      // Position camera looking down at the galaxy at a 45-degree angle
      camera.position.set(0, 110, 140);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Group to contain the galaxy and allow dynamic positioning
      const galaxyGroup = new THREE.Group();
      scene.add(galaxyGroup);

      // Spiral Galaxy Generation Parameters (Optimized for subtle and elegant stardust)
      const parameters = {
        count: width < 768 ? 1500 : 4500,
        size: width < 768 ? 1.2 : 1.5, // Subtle stardust particles
        radius: 105,
        branches: 3,
        spin: 1.4,
        randomness: 0.5,
        power: 5.0, // High concentration at core and branches
        insideColor: new THREE.Color(0x0284c7),  // Deep sky-blue core
        outsideColor: new THREE.Color(0x4f46e5), // Rich indigo arms
        violetColor: new THREE.Color(0x7c3aed),  // Saturated violet highlights
      };

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      for (let i = 0; i < parameters.count; i++) {
        const radius = Math.random() * parameters.radius;
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
        const spinAngle = radius * parameters.spin;

        // Exponential distribution for high center concentration
        const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        // Coordinates
        positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i * 3 + 1] = randomY;
        positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color blending (subtle glowing core fading to dark violet/indigo arms)
        const mixedColor = parameters.insideColor.clone();
        
        if (radius < parameters.radius * 0.25) {
          mixedColor.lerp(parameters.violetColor, radius / (parameters.radius * 0.25));
        } else {
          mixedColor.copy(parameters.violetColor).lerp(parameters.outsideColor, (radius - parameters.radius * 0.25) / (parameters.radius * 0.75));
        }

        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Circular soft glow particle texture
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.15)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      particleTexture = new THREE.CanvasTexture(canvas);

      particleMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.25, // Dim but colorful stardust opacity
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      points = new THREE.Points(geometry, particleMaterial);
      galaxyGroup.add(points);

      // Resize handler
      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height);
      };
      window.addEventListener("resize", handleResize);

      // Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Slowly rotate galaxy branches
        if (points) {
          points.rotation.y += 0.0012;
        }

        // Parallax mouse movements
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Scroll responsive positioning ("adjust them in background according to place")
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
        const scrollRatio = Math.min(scrollY / maxScroll, 1.0);

        // Dynamic Galaxy Group position shifting based on active sections
        let targetX = 18;
        let targetY = -5;
        let targetZ = 0;

        if (scrollRatio < 0.25) {
          const t = scrollRatio / 0.25;
          targetX = THREE.MathUtils.lerp(18, -22, t);
          targetY = THREE.MathUtils.lerp(-5, 8, t);
        } else if (scrollRatio < 0.6) {
          const t = (scrollRatio - 0.25) / 0.35;
          targetX = THREE.MathUtils.lerp(-22, 0, t);
          targetY = THREE.MathUtils.lerp(8, -12, t);
        } else {
          const t = (scrollRatio - 0.6) / 0.4;
          targetX = THREE.MathUtils.lerp(0, 15, t);
          targetY = THREE.MathUtils.lerp(-12, -3, t);
        }

        // Apply smooth position transitions to the galaxy
        galaxyGroup.position.x += (targetX - galaxyGroup.position.x) * 0.06;
        galaxyGroup.position.y += (targetY - galaxyGroup.position.y) * 0.06;
        galaxyGroup.position.z += (targetZ - galaxyGroup.position.z) * 0.06;

        // Subtle camera zoom depth on scroll
        camera.position.x = mouse.x * 15;
        camera.position.y = 110 - (scrollRatio * 45) - (mouse.y * 10);
        camera.position.z = 140 - (scrollRatio * 55);
        camera.lookAt(galaxyGroup.position);

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);

        renderer?.dispose();
        particleTexture?.dispose();
        particleMaterial?.dispose();
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };

    } catch (e) {
      console.warn("WebGL Galaxy generation failed, using 2D fallback.", e);
      useWebGL = false;
    }

    // 2D Galaxy Fallback
    if (!useWebGL) {
      const canvas2d = document.createElement("canvas");
      canvas2d.width = width;
      canvas2d.height = height;
      container.appendChild(canvas2d);
      const ctx2d = canvas2d.getContext("2d");

      const handleResize2d = () => {
        width = canvas2d.width = window.innerWidth;
        height = canvas2d.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize2d);

      let angle = 0;
      const canvas2dAnimate = () => {
        if (!ctx2d) return;
        ctx2d.clearRect(0, 0, width, height);

        angle += 0.002;
        ctx2d.save();
        ctx2d.translate(width / 2, height / 2);
        ctx2d.rotate(angle);

        ctx2d.fillStyle = "rgba(6, 182, 212, 0.08)";
        for (let j = 0; j < 3; j++) {
          const branchOffset = (j / 3) * Math.PI * 2;
          for (let r = 0; r < 200; r += 5) {
            const spin = r * 0.015;
            const x = Math.cos(branchOffset + spin) * r;
            const y = Math.sin(branchOffset + spin) * r;
            ctx2d.beginPath();
            ctx2d.arc(x, y, 1.0, 0, Math.PI * 2);
            ctx2d.fill();
          }
        }
        ctx2d.restore();

        animationFrameId = requestAnimationFrame(canvas2dAnimate);
      };

      canvas2dAnimate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize2d);
        if (container.contains(canvas2d)) {
          container.removeChild(canvas2d);
        }
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-1 h-full w-full pointer-events-none bg-transparent"
    />
  );
}
