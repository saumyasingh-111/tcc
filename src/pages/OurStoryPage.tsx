import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../data/images";
import { VegBadge } from "../components/VegBadge";
import { Heart, Sparkles, Coffee, ArrowRight } from "lucide-react";

export const OurStoryPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-2">
          About Us
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C241E] tracking-tight mb-4">
          OUR STORY
        </h1>
        <div className="w-12 h-0.5 bg-[#C59F54] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#59605C] max-w-xl mx-auto leading-relaxed">
          &ldquo;A little corner made for honest food, warm bakes, and easy conversations.&rdquo;
        </p>
      </section>

      {/* Main Feature Image with Editorial Caption */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD3] bg-[#EFE9DE]">
          <img
            src={IMAGES.story.interiorWindow}
            alt="Warm sunlit corner at The Classic Crush Cafe"
            className="w-full h-[380px] sm:h-[520px] object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#D8B774] font-semibold block mb-1">
                The Neighbourhood Gathering
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal max-w-md">
                Where good food brings people together every single day.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs">
              <VegBadge size="sm" />
              <span>100% Vegetarian &amp; Eggless</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Story Body */}
      <section className="max-w-3xl mx-auto px-6 space-y-10 text-[#3E4340] leading-relaxed font-light text-base sm:text-lg">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C241E] font-normal mb-4">
            How it all started
          </h2>
          <p>
            The Classic Crush was born out of a very simple, everyday realization: college towns and neighbourhood streets are full of places to eat, but very few places where you feel truly welcome to sit back, catch up with friends, and enjoy genuine handcrafted comfort food without spending a small fortune.
          </p>
          <p className="mt-4">
            We wanted to build that exact place — a warm, welcoming vegetarian bakery and cafe where the smell of freshly baked puff pastry greets you at the door, the cold coffee is churned thick and honest, and chocolate cravings find their sweetest answer.
          </p>
        </div>

        <div className="p-8 bg-[#FCFAF7] rounded-2xl border border-[#E8DFD3]">
          <div className="flex items-center gap-2 mb-3">
            <VegBadge size="md" />
            <h3 className="font-serif text-xl font-bold text-[#1C241E]">
              Our Pure Vegetarian Promise
            </h3>
          </div>
          <p className="text-sm sm:text-base text-[#575E5B] leading-relaxed">
            Every single item on our counter is strictly 100% vegetarian. All of our celebration cakes, chocolate pastries, and brownie cups are completely eggless, baked with fresh butter, wholesome flour, and rich cocoa. You never have to ask twice or check twice — you can order anything on the menu with complete peace of mind.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C241E] font-normal mb-4">
            Baked fresh, served warm
          </h2>
          <p>
            We don&apos;t believe in pre-packed, frozen food warmed in a microwave. Our patties are baked golden and flaky every morning, our stone-crust pizzas are topped with fresh paneer and baked to order, and our momos are steamed hot when you ask for them.
          </p>
          <p className="mt-4">
            It takes a few extra minutes, but that first warm, gooey bite makes all the difference.
          </p>
        </div>
      </section>

      {/* 3 Atmospheric Details Photography Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#EFE9DE] group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={IMAGES.story.bakeryCounter}
                alt="Fresh morning bakes and bakery counter"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-serif font-bold text-base text-[#1C241E]">Daily Morning Bakes</h4>
              <p className="text-xs text-[#767E7A] mt-1 font-light">Flaky puff patties and sweet pastries fresh out of the oven</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#EFE9DE] group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={IMAGES.story.coffeePrep}
                alt="Artisan coffee preparation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-serif font-bold text-base text-[#1C241E]">Handcrafted Brews</h4>
              <p className="text-xs text-[#767E7A] mt-1 font-light">From steaming kadak chai to frothy thick cold coffees</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#EFE9DE] group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={IMAGES.story.tableFriends}
                alt="Friends enjoying food at cafe table"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-serif font-bold text-base text-[#1C241E]">Your Cozy Corner</h4>
              <p className="text-xs text-[#767E7A] mt-1 font-light">Made for study sessions, birthday treats, and everyday hangouts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 border-t border-[#E8DFD3] pt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#26332A] mx-auto sm:mx-0">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1C241E]">Honest &amp; Local</h4>
            <p className="text-xs text-[#575E5B] font-light leading-relaxed">
              Student-friendly pricing without compromising on quality or hygiene.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#26332A] mx-auto sm:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1C241E]">100% Vegetarian</h4>
            <p className="text-xs text-[#575E5B] font-light leading-relaxed">
              Strictly eggless bakes and vegetarian savouries prepared in a clean kitchen.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#26332A] mx-auto sm:mx-0">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#1C241E]">Warm Hospitality</h4>
            <p className="text-xs text-[#575E5B] font-light leading-relaxed">
              A welcoming smile, quick service, and a table that always feels like home.
            </p>
          </div>
        </div>

        {/* CTA to Menu */}
        <div className="text-center mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#26332A] text-white hover:bg-[#1C241E] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all"
          >
            <span>Explore What We Bake</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
