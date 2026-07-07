import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { heroSlidesService, dailyActivitiesService } from '../services/heroAndActivitiesService';
import toast from 'react-hot-toast';

// ── Hero Slides ──────────────────────────────────────────────
export const useHeroSlides = (includeAll = false) => {
  return useQuery({
    queryKey: ['hero-slides', includeAll],
    queryFn: () => includeAll ? heroSlidesService.getAllSlides() : heroSlidesService.getSlides(),
  });
};

export const useUpsertHeroSlide = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: heroSlidesService.upsertSlide,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero-slides'] });
      toast.success('Slide saved!');
    },
    onError: (e) => toast.error(e.message),
  });
};

export const useDeleteHeroSlide = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: heroSlidesService.deleteSlide,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero-slides'] });
      toast.success('Slide deleted');
    },
    onError: (e) => toast.error(e.message),
  });
};

// ── Daily Activities ─────────────────────────────────────────
export const useDailyActivities = (includeAll = false, limit = 20) => {
  return useQuery({
    queryKey: ['daily-activities', includeAll, limit],
    queryFn: () => includeAll ? dailyActivitiesService.getAllActivities() : dailyActivitiesService.getActivities(limit),
  });
};

export const useUpsertDailyActivity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: dailyActivitiesService.upsertActivity,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['daily-activities'] });
      toast.success('Activity saved!');
    },
    onError: (e) => toast.error(e.message),
  });
};

export const useDeleteDailyActivity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: dailyActivitiesService.deleteActivity,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['daily-activities'] });
      toast.success('Activity deleted');
    },
    onError: (e) => toast.error(e.message),
  });
};
