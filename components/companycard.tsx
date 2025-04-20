import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Founder {
  name: string;
  linkedin: string;
}

interface CompanyProps {
  name: string;
  website: string;
  description: string;
  industry: string;
  founders: Founder[];
  founded: string;
  teamSize: number;
  location: string;
  socials: string;
}

const CompanyCard: React.FC<CompanyProps> = ({
  name,
  website,
  description,
  industry,
  founders,
  founded,
  teamSize,
  location,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-blue-600 hover:underline"
            >
              {website.replace('https://', '')}
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{industry}</Badge>
          <Badge variant="secondary">{location}</Badge>
          <Badge variant="outline">Team: {teamSize}</Badge>
        </div>
        <div className="text-sm text-gray-500 space-y-2">
          <p>Founded: {founded}</p>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Founders:</span>
            <div className="flex space-x-3 items-center">
              {founders.map((founder, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-md transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {founder.name}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
