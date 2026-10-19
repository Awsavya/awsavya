"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/site";

export default function CapabilitiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = services.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 45;

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  }

  // Autoplay with pause on hover/touch
  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused]);

  return (
    <div
      className="capabilities-carousel-container"
      role="region"
      aria-roledescription="carousel"
      aria-label="AWSAVYA Core Capabilities Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-topline">
        <div className="carousel-header-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> WHAT WE BRING TO THE TABLE</span>
          <h3>Connected capability. Built around your next move.</h3>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="carousel-controls" aria-label="Carousel navigation">
          <button
            type="button"
            className="carousel-btn"
            onClick={prevSlide}
            aria-label="Previous capability slide"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="carousel-counter" aria-live="polite">
            0{currentIndex + 1} / 0{totalSlides}
          </span>
          <button
            type="button"
            className="carousel-btn"
            onClick={nextSlide}
            aria-label="Next capability slide"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel Track with smooth touch transitions */}
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {services.map((service, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={service.number}
                className={`carousel-slide ${isActive ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${service.number} of ${totalSlides}: ${service.title}`}
                aria-hidden={!isActive}
              >
                <div className="carousel-card">
                  <div className="carousel-card-header">
                    <span className="carousel-icon-box">
                      <ServiceIcon name={service.icon} size={22} />
                    </span>
                    <span className="carousel-slide-num">0{index + 1} / 0{totalSlides}</span>
                  </div>

                  <div className="carousel-card-body">
                    <span className="carousel-card-tag">DIGITAL CAPABILITY</span>
                    <h4>{service.title}</h4>
                    <p className="carousel-card-lead">{service.short}</p>
                    <p className="carousel-card-desc">{service.description}</p>

                    <div className="carousel-pill-row">
                      {service.tags.map((tag) => (
                        <span key={tag} className="carousel-tag-pill">
                          <Check size={11} className="text-blue" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="carousel-card-footer">
                    <Link href={`/services#${service.icon}`} className="carousel-action-link">
                      <span>Explore {service.title.toLowerCase()}</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="carousel-pagination" role="tablist" aria-label="Select slide">
        {services.map((s, idx) => (
          <button
            key={s.number}
            type="button"
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Slide ${idx + 1}: ${s.title}`}
            className={`carousel-dot ${idx === currentIndex ? "is-active" : ""}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
