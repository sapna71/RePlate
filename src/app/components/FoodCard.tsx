import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: string;
  servings: number;
  expiryDate: string;
  location: string;
  distance: string;
  donorName: string;
  category: "prepared" | "fresh" | "packaged" | "baked";
  imageUrl: string;
  isUrgent: boolean;
  createdAt: string;
}

interface FoodCardProps {
  listing: FoodListing;
  onRequest?: (id: string) => void;
  onEdit?: (id: string) => void;
  onWithdraw?: (id: string) => void;
  isOwner?: boolean;
}

export default function FoodCard({
  listing,
  onRequest,
  onEdit,
  onWithdraw,
  isOwner = false,
}: FoodCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "prepared":
        return "bg-white text-blue-700 border-blue-200 shadow-sm";
      case "fresh":
        return "bg-white text-green-700 border-green-200 shadow-sm";
      case "packaged":
        return "bg-white text-purple-700 border-purple-200 shadow-sm";
      case "baked":
        return "bg-white text-amber-700 border-amber-200 shadow-sm";
      default:
        return "bg-white text-stone-700 border-stone-200 shadow-sm";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "prepared":
        return "Prepared Food";
      case "fresh":
        return "Fresh Produce";
      case "packaged":
        return "Packaged Goods";
      case "baked":
        return "Baked Goods";
      default:
        return category;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffHours = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 1) return "Just posted";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const isExpiringSoon = () => {
    const expiry = new Date(listing.expiryDate);
    const now = new Date();
    const diffHours =
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  const getTimeUntilExpiry = () => {
    const expiry = new Date(listing.expiryDate);
    const now = new Date();
    const diffHours = Math.floor(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
    
    if (diffHours <= 0) return "⏰ Expired";
    if (diffHours <= 2) return "⏱️ 2h left";
    if (diffHours <= 6) return "⏲️ 6h left";
    if (diffHours <= 24) return "⏰ 24h left";
    
    const diffDays = Math.floor(diffHours / 24);
    return `📅 ${diffDays}d left`;
  };

  const getTimeColor = () => {
    const expiry = new Date(listing.expiryDate);
    const now = new Date();
    const diffHours = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours <= 0) return "text-orange-400";
    if (diffHours <= 2) return "text-orange-400";
    if (diffHours <= 6) return "text-orange-400";
    if (diffHours <= 24) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white backdrop-blur border-stone-200 hover:border-orange-500/30">
      <div className="relative">
        <ImageWithFallback
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={getCategoryColor(listing.category)} variant="outline">
            {getCategoryLabel(listing.category)}
          </Badge>
          {listing.isUrgent && (
            <Badge className="bg-orange-600 text-white border-orange-700 shadow-sm" variant="outline">
              🔴 Urgent
            </Badge>
          )}
          {isExpiringSoon() && (
            <Badge className="bg-white text-orange-700 border-orange-200 shadow-sm" variant="outline">
              {getTimeUntilExpiry()}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className="bg-white/90 text-stone-600 border-stone-300 backdrop-blur"
          >
            {formatTimeAgo(listing.createdAt)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg text-stone-900">
                {listing.title}
              </h3>
              {!isExpiringSoon() && (
                <span className={`text-sm ${getTimeColor()}`}>
                  {getTimeUntilExpiry()}
                </span>
              )}
            </div>
            <p className="text-stone-500 text-sm line-clamp-2">
              {listing.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-stone-500">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <span>{listing.servings} servings</span>
            </div>
            <div className="flex items-center text-stone-500">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{listing.distance}</span>
            </div>
            <div className="flex items-center text-stone-500">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 012 0v4h6V3a1 1 0 112 0v4h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 11h18"
                />
              </svg>
              <span>
                Expires{" "}
                {new Date(
                  listing.expiryDate,
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-stone-500">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{listing.quantity}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <div className="text-sm text-stone-500">
              <span>By </span>
              <span className="font-medium text-stone-900">
                {listing.donorName}
              </span>
            </div>

            {isOwner ? (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-stone-300 text-stone-600 hover:bg-stone-100"
                  onClick={() => onEdit?.(listing.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-600/50 text-orange-400 hover:bg-orange-600/20"
                  onClick={() => onWithdraw?.(listing.id)}
                >
                  Withdraw
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => onRequest?.(listing.id)}
              >
                Request
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}