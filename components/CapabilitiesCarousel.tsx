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

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  // Autoplay with pause on hover
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

      {/* Carousel Track */}
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
                      <ServiceIcon name={service.icon} size={24} />
                    </span>
                    <span className="carousel-slide-num">0{index + 1}</span>
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
