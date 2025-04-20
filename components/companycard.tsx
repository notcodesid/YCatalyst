import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin, Globe, ExternalLink } from "lucide-react";

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
  socials
}) => {
  // Function to format industry tags
  const formatIndustryTags = (industry: string) => {
    if (!industry) return [];
    return industry.split(',').map(tag => tag.trim());
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center space-x-3">
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                <Globe className="h-3 w-3 mr-1" />
                {website.replace(/^https?:\/\//, '')}
              </a>
              
              {socials && (
                <a 
                  href={socials.startsWith('http') ? socials : `https://${socials}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {socials.includes('linkedin.com') ? 'LinkedIn' : 
                   socials.includes('twitter.com') ? 'Twitter' : 
                   socials.includes('x.com') ? 'X' : 'Social'}
                </a>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {formatIndustryTags(industry).map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
          {location && <Badge variant="secondary">{location}</Badge>}
          {teamSize > 0 && <Badge variant="outline">Team: {teamSize}</Badge>}
        </div>
        <div className="text-sm text-gray-500 space-y-2">
          {founded && <p>Founded: {founded}</p>}
          {founders && founders.length > 0 && (
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">Founders:</span>
              <div className="flex flex-wrap gap-2">
                {founders.map((founder, index) => (
                  <div key={index} className="flex items-center">
                    {founder.linkedin ? (
                      <a 
                        href={founder.linkedin.startsWith('http') ? founder.linkedin : `https://${founder.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:bg-gray-100 p-1 rounded-md transition-colors group"
                      >
                        <Linkedin className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {founder.name}
                        </span>
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-gray-700 p-1">
                        {founder.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
