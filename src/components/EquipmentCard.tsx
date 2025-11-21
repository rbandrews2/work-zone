import React from 'react';

interface EquipmentCardProps {
  name: string;
  image: string;
  status: 'available' | 'in-use' | 'maintenance';
  location: string;
  operator?: string;
  onClick: () => void;
}

export default function EquipmentCard({
  name, image, status, location, operator, onClick
}: EquipmentCardProps) {
  const statusColors = {
    available: 'bg-green-500/20 text-green-400 border-green-500/30',
    'in-use': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    maintenance: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div 
      onClick={onClick}
      className="bg-black/40 backdrop-blur-md border border-amber-500/30 rounded-lg shadow-[0_0_20px_rgba(255,179,0,0.1)] overflow-hidden hover:shadow-[0_0_30px_rgba(255,179,0,0.2)] transition-all cursor-pointer hover:border-amber-500/50"
    >
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white">{name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-1">Location: {location}</p>
        {operator && <p className="text-sm text-gray-500">Operator: {operator}</p>}
      </div>
    </div>
  );
}
