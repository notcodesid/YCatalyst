import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function CompanyFilters() {
  return (
    <div className="w-full md:w-[300px] space-y-6 bg-white p-6 rounded-lg border">
      {/* Industry Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Industry</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-industries" />
            <Label htmlFor="all-industries">All Industries</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="research" />
            <Label htmlFor="research">Research and Intelligence</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sales" />
            <Label htmlFor="sales">Sales</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ai" />
            <Label htmlFor="ai">AI and Machine Learning</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Location Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Location</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-locations" />
            <Label htmlFor="all-locations">All Locations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sf" />
            <Label htmlFor="sf">San Francisco</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="nyc" />
            <Label htmlFor="nyc">New York</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Team Size Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Team Size</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-sizes" />
            <Label htmlFor="all-sizes">All Sizes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="1-10" />
            <Label htmlFor="1-10">1-10</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="11-50" />
            <Label htmlFor="11-50">11-50</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Founded Year Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Founded</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-years" />
            <Label htmlFor="all-years">All Years</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2024" />
            <Label htmlFor="2024">2024</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2023" />
            <Label htmlFor="2023">2023</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
