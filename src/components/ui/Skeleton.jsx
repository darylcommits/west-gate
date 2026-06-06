import React from 'react';

/* ─────────────────────────── Primitives ─────────────────────────── */

const SkeletonBox = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

const SkeletonText = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const SkeletonCircle = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

/* ─────────────────────── PropertyCardSkeleton ──────────────────── */

export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
    {/* Image */}
    <SkeletonBox className="w-full h-52 rounded-none" />
    <div className="p-4 space-y-3">
      {/* Badge row */}
      <div className="flex items-center gap-2">
        <SkeletonBox className="h-5 w-16 rounded-full" />
        <SkeletonBox className="h-5 w-24 rounded-full" />
      </div>
      {/* Title */}
      <SkeletonText className="h-5 w-3/4" />
      <SkeletonText className="h-4 w-1/2" />
      {/* Price */}
      <SkeletonText className="h-6 w-1/3" />
      {/* Stats row */}
      <div className="flex gap-4 pt-1">
        <SkeletonText className="h-4 w-12" />
        <SkeletonText className="h-4 w-12" />
        <SkeletonText className="h-4 w-12" />
      </div>
      {/* Button */}
      <SkeletonBox className="h-10 w-full rounded-lg mt-2" />
    </div>
  </div>
);

/* ─────────────────────── PropertyListSkeleton ──────────────────── */

export const PropertyListSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
);

/* ─────────────────────── DashboardStatsSkeleton ────────────────── */

export const DashboardStatsSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <SkeletonText className="h-4 w-24" />
          <SkeletonCircle className="w-10 h-10" />
        </div>
        <SkeletonText className="h-8 w-20" />
        <SkeletonText className="h-3 w-32" />
      </div>
    ))}
  </div>
);

/* ─────────────────────── TableRowSkeleton ──────────────────────── */

export const TableRowSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Table header */}
    <div className="grid border-b border-gray-100 px-4 py-3 bg-gray-50"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonText key={i} className="h-4 w-3/4" />
      ))}
    </div>
    {/* Table rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="grid items-center px-4 py-4 border-b border-gray-50 last:border-0"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols }).map((_, colIdx) => (
          <SkeletonText
            key={colIdx}
            className={`h-4 ${colIdx === 0 ? 'w-4/5' : 'w-2/3'}`}
          />
        ))}
      </div>
    ))}
  </div>
);

/* ─────────────────────────── ProfileSkeleton ───────────────────── */

export const ProfileSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Cover */}
    <SkeletonBox className="h-32 rounded-none" />
    <div className="px-6 pb-6">
      {/* Avatar */}
      <div className="-mt-10 mb-4">
        <SkeletonCircle className="w-20 h-20 ring-4 ring-white" />
      </div>
      {/* Name */}
      <SkeletonText className="h-6 w-40 mb-2" />
      <SkeletonText className="h-4 w-28 mb-4" />
      {/* Info rows */}
      <div className="space-y-3 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonCircle className="w-5 h-5 flex-shrink-0" />
            <SkeletonText className="h-4 flex-1" />
          </div>
        ))}
      </div>
      {/* Button */}
      <SkeletonBox className="h-10 w-full rounded-lg mt-6" />
    </div>
  </div>
);

/* ─────────────────────── Generic Skeleton ──────────────────────── */

const Skeleton = {
  Box: SkeletonBox,
  Text: SkeletonText,
  Circle: SkeletonCircle,
  PropertyCard: PropertyCardSkeleton,
  PropertyList: PropertyListSkeleton,
  DashboardStats: DashboardStatsSkeleton,
  TableRow: TableRowSkeleton,
  Profile: ProfileSkeleton,
};

export default Skeleton;
