"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: number;
    title: string;
    duration: string;
    days: string;
    category: string;
    price: string;
    locations: string;
    description: string;
  } | null;
}

export function BookingModal({ isOpen, onClose, packageData }: BookingModalProps) {
  const [name, setName] = useState('');
  const [dates, setDates] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDates('');
      setContact('');
    }
  }, [isOpen]);

  if (!packageData) return null;

  const whatsappNumber = '254700064857';

  function handleSend() {
    if (!packageData) return;
    const msg = `Booking Inquiry - ${packageData.title} (ID: ${packageData.id})\nDuration: ${packageData.duration}\nDays: ${packageData.days}\nCategory: ${packageData.category}\nPrice: ${packageData.price}\nLocations: ${packageData.locations}\nDescription: ${packageData.description}\n\nPlease reserve a spot for me on this package.\nTraveler name: ${name || 'N/A'}\nPreferred dates: ${dates || 'N/A'}\nContact phone/email: ${contact || 'N/A'}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    // Open WhatsApp in a new tab/window
    window.open(url, '_blank', 'noopener');
    onClose();
  }
  // Handle sending the message via WhatsApp
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="bg-neutral-900 rounded-2xl max-w-lg w-full p-6 border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`${playfair.className} text-2xl text-white font-bold`}>{packageData.title}</h3>
                <p className="text-neutral-400 text-sm">{packageData.days} • {packageData.price}</p>
              </div>
              <button onClick={onClose} className="text-neutral-300 p-2 rounded-full hover:bg-neutral-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-neutral-300">Traveler name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white" placeholder="Full name" />

              <label className="block text-sm text-neutral-300">Preferred dates</label>
              <input value={dates} onChange={(e) => setDates(e.target.value)} className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white" placeholder="e.g. 12 Aug - 22 Aug 2026" />

              <label className="block text-sm text-neutral-300">Contact phone or email</label>
              <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white" placeholder="Phone or email" />
            </div>

            <div className="mt-6 flex gap-2 justify-end items-center">
              <Button variant="outline" onClick={onClose} className="px-3 py-1 text-sm h-8">Cancel</Button>
              <Button onClick={handleSend} className="bg-yellow-400 text-neutral-900 px-4 py-1 text-sm h-8">Send via WhatsApp</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
