import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { FoodListing } from "./FoodCard";

interface FoodListingEditOverlayProps {
  listing: FoodListing;
  onSave: (updatedListing: FoodListing) => void;
  onCancel: () => void;
}

export default function FoodListingEditOverlay({ listing, onSave, onCancel }: FoodListingEditOverlayProps) {
  const [formData, setFormData] = React.useState({
    title: listing.title,
    description: listing.description,
    quantity: listing.quantity,
    servings: listing.servings.toString(),
    expiryDate: listing.expiryDate,
    category: listing.category,
    location: listing.location,
    isUrgent: listing.isUrgent,
    photos: [] as File[]
  });

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files].slice(0, 3) }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const updatedListing: FoodListing = {
      ...listing,
      title: formData.title,
      description: formData.description,
      quantity: formData.quantity,
      servings: parseInt(formData.servings) || 1,
      expiryDate: formData.expiryDate,
      category: formData.category as any,
      location: formData.location,
      isUrgent: formData.isUrgent
    };
    onSave(updatedListing);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-stone-900 text-xl">Edit Food Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Photo Upload Section */}
            <div>
              <Label className="text-stone-600">Food Photos (up to 3)</Label>
              <div className="mt-2 space-y-4">
                {/* Current listing photo */}
                <div className="flex flex-wrap gap-4">
                  <div className="relative w-24 h-24 bg-stone-100 rounded-lg overflow-hidden">
                    <img 
                      src={listing.imageUrl} 
                      alt="Current photo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-stone-900 text-xs p-1 text-center">
                      Current
                    </div>
                  </div>
                  
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative w-24 h-24 bg-stone-100 rounded-lg overflow-hidden">
                      <img 
                        src={URL.createObjectURL(photo)} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-stone-900 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  {formData.photos.length < 3 && (
                    <label className="w-24 h-24 bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-stone-100">
                      <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-stone-600">Food Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Fresh Vegetables, Prepared Meals"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-stone-600">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh Produce</SelectItem>
                    <SelectItem value="prepared">Prepared Food</SelectItem>
                    <SelectItem value="packaged">Packaged Goods</SelectItem>
                    <SelectItem value="baked">Baked Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-stone-600">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the food, its condition, and any special instructions"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[100px] bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="quantity" className="text-stone-600">Quantity/Portions</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 5-6 portions, 3 bags"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="servings" className="text-stone-600">Number of Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', e.target.value)}
                  className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiryDate" className="text-stone-600">Best By Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="bg-stone-50 border-stone-300 text-stone-900"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-stone-600">Pickup Location</Label>
              <Input
                id="location"
                placeholder="e.g., Downtown Restaurant, Home Address"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="urgent"
                checked={formData.isUrgent}
                onCheckedChange={(checked) => handleInputChange('isUrgent', checked)}
              />
              <Label htmlFor="urgent" className="text-stone-600">Mark as urgent (expires within 24 hours)</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSave}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="border-stone-300 text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}