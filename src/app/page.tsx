// File: app/page.tsx
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Wand2, FileText, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '@/components/ui/particles';
import { Spotlight } from '@/components/ui/spotlight';
import { useTheme } from 'next-themes';
import { Bricolage_Grotesque } from 'next/font/google';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const brico = Bricolage_Grotesque({
  subsets: ['latin'],
});

const users = [
  { imgUrl: 'https://avatars.githubusercontent.com/u/111780029' },
  { imgUrl: 'https://avatars.githubusercontent.com/u/123104247' },
  { imgUrl: 'https://avatars.githubusercontent.com/u/115650165' },
  { imgUrl: 'https://avatars.githubusercontent.com/u/71373838' },
];

// Data for the new feature cards
const features = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: '25+ Professional Templates',
    description: 'Choose from a variety of ATS-friendly templates designed by experts to get you hired.',
  },
  {
    icon: <Wand2 className="h-6 w-6 text-primary" />,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent feedback and suggestions to improve your resume wording and impact.',
  },
  {
    icon: <Rocket className="h-6 w-6 text-primary" />,
    title: 'Interview-Ready in Minutes',
    description: 'Go from a blank page to a complete, professional resume faster than ever before.',
  },
];

export default function Page() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    // This sets the particle color based on the theme
    setColor(resolvedTheme === 'dark' ? '#ffffff' : '#0a192f');
  }, [resolvedTheme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('https://formspree.io/f/myzpjadj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        let errorText;
        try {
          const errorData = await response.json();
          errorText = errorData.error || 'An unknown error occurred.';
        } catch (e) {
          errorText = await response.text();
        }
        throw new Error(errorText);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      
      {/* FIX: Changed -z-10 to z-0 to make particles visible */}
      <Particles className="absolute inset-0 z-0" quantity={100} color={color} />

      {/* Main Content Grid */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Column: Hero Content & Form */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary"
          >
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">V</span>
            </div>
            Verfolia Resume Builder
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={cn(
              'mb-4 bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl',
              brico.className,
            )}
          >
            Build a Resume That Gets You Hired
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-muted-foreground mt-2 mb-8 max-w-md sm:text-lg"
          >
            Create a professional, interview-ready resume in minutes. Let our AI guide you to the perfect job application.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <div className="relative flex w-full flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <motion.input
                      key="email-input"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border-border bg-background/50 px-6 py-4 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    />
                    {error && (
                      <motion.p className="text-destructive mt-2 text-sm">
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="group rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                      <Sparkles className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              ) : (
                <motion.div
                  key="thank-you-message"
                  className="w-full flex-1 cursor-pointer rounded-xl border border-green-500/20 bg-green-500/10 p-4 font-medium text-green-400"
                >
                  <span className="flex items-center justify-center gap-2">
                    Thanks for joining! <Sparkles className="h-4 w-4 animate-pulse" />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 flex items-center justify-center gap-2 lg:justify-start"
          >
            <div className="flex -space-x-3">
              {users.map((user, i) => (
                <Image
                  key={i}
                  src={user.imgUrl}
                  alt="Avatar"
                  className="size-10 rounded-full border-2 border-background"
                  width={40}
                  height={40}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">100+</span> already joined ✨
            </span>
          </motion.div>
        </div>

        {/* Right Column: Feature Showcase */}
        <motion.div 
            className="grid grid-cols-1 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.5,
                    }
                }
            }}
        >
          {features.map((feature, i) => (
           <motion.div
  key={i}
  className="animate-float flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
  style={{ animationDelay: `${i * 0.2}s` }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }}
>
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}