"use client";
import React from "react";
import AreaRadioGroup, { RadioItem } from "@/components/base/radio/area-radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function TestPage() {
  return (
    <div className="container py-10 space-y-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Radio Group Examples</h1>
        <Example1 />
        <Example2 />
        <Example3 />
        <IndicatorExamples />
      </div>
    </div>
  );
}

const Example1 = () => {
  const handleValueChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <section className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">Choose Account Type</h2>
        <p className="text-sm text-muted-foreground">Select the type of account you want to create.</p>
      </div>
      <AreaRadioGroup
        defaultValue="personal"
        onValueChange={handleValueChange}
      >
        <RadioItem value="personal">
          <div className="flex flex-col items-start">
            <Label>Personal Account</Label>
            <p className="text-sm text-muted-foreground">
              For individual use. Perfect for freelancers and personal projects.
            </p>
          </div>
        </RadioItem>
        <RadioItem value="business">
          <div className="flex flex-col items-start">
            <Label>Business Account</Label>
            <p className="text-sm text-muted-foreground">
              For business use. Includes team collaboration features.
            </p>
          </div>
        </RadioItem>
      </AreaRadioGroup>
    </section>
  );
};

const Example2 = () => {
  const handleValueChange = (value: string) => {
    console.log("Selected payment method:", value);
  };

  return (
    <section className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred payment method.</p>
      </div>
      <AreaRadioGroup
        defaultValue="card1"
        onValueChange={handleValueChange}
        className="flex-row gap-4"
      >
        <RadioItem value="card1">
          <div className="flex items-center space-x-3">
            <Image
              src="/visa.png"
              alt="Visa"
              width={40}
              height={24}
              className="object-contain"
            />
            <div className="flex flex-col">
              <Label>Visa ending in 4242</Label>
              <p className="text-sm text-muted-foreground">Expires 12/24</p>
            </div>
          </div>
        </RadioItem>
        <RadioItem value="card2">
          <div className="flex items-center space-x-3">
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={40}
              height={24}
              className="object-contain"
            />
            <div className="flex flex-col">
              <Label>Mastercard ending in 8888</Label>
              <p className="text-sm text-muted-foreground">Expires 08/25</p>
            </div>
          </div>
        </RadioItem>
      </AreaRadioGroup>
    </section>
  );
};

const Example3 = () => {
  return (
    <section className="space-y-8">
      <div>
        <div className="space-y-1.5 mb-4">
          <h2 className="text-xl font-semibold">Alternative Positions</h2>
          <p className="text-sm text-muted-foreground">Examples of different radio button positions.</p>
        </div>
        <AreaRadioGroup defaultValue="right">
          <RadioItem value="right" radioPosition="right">
            <div className="flex flex-col">
              <Label>Right Radio</Label>
              <p className="text-sm text-muted-foreground">
                Radio button appears on the right
              </p>
            </div>
          </RadioItem>
        </AreaRadioGroup>
      </div>

      <div>
        <div className="space-y-1.5 mb-4">
          <h2 className="text-xl font-semibold">Border Only Selection</h2>
          <p className="text-sm text-muted-foreground">Simple border highlight on selection.</p>
        </div>
        <AreaRadioGroup defaultValue="hidden" className="grid grid-cols-2 gap-4">
          <RadioItem value="hidden" indicatorType="border">
            <div className="flex flex-col items-start">
              <Label>Hidden Radio</Label>
              <p className="text-sm text-muted-foreground line-clamp-1">
                Radio button is hidden but still functional
              </p>
            </div>
          </RadioItem>
          <RadioItem value="hidden2" indicatorType="border">
            <div className="flex flex-col items-start">
              <Label>Another Hidden Radio</Label>
              <p className="text-sm text-muted-foreground">
                Also without radio button
              </p>
            </div>
          </RadioItem>
        </AreaRadioGroup>
      </div>
    </section>
  );
};

const IndicatorExamples = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">Indicator Variations</h2>
        <p className="text-sm text-muted-foreground">Different styles of selection indicators.</p>
      </div>

      <div className="space-y-8">
        {/* Border Only Example */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-medium">Border Indicator</h3>
            <p className="text-sm text-muted-foreground">Simple border highlight on selection.</p>
          </div>
          <AreaRadioGroup
            defaultValue="option1"
            className="grid grid-cols-2 gap-4"
          >
            <RadioItem value="option1" indicatorType="border">
              <div className="flex flex-col items-center p-4">
                <Label>Option 1</Label>
                <p className="text-sm text-muted-foreground">
                  Border indicator only
                </p>
              </div>
            </RadioItem>
            <RadioItem value="option2" indicatorType="border">
              <div className="flex flex-col items-center p-4">
                <Label>Option 2</Label>
                <p className="text-sm text-muted-foreground">
                  Border indicator only
                </p>
              </div>
            </RadioItem>
          </AreaRadioGroup>
        </div>

        {/* Check Mark Example */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-medium">Check Mark Indicator</h3>
            <p className="text-sm text-muted-foreground">Shows a checkmark when selected.</p>
          </div>
          <AreaRadioGroup 
            defaultValue="check1" 
            className="flex gap-4"
          >
            <RadioItem value="check1" indicatorType="check">
              <div className="flex flex-col">
                <Label>With Check</Label>
                <p className="text-sm text-muted-foreground">
                  Shows checkmark when selected
                </p>
              </div>
            </RadioItem>
            <RadioItem value="check2" indicatorType="check">
              <div className="flex flex-col">
                <Label>With Check</Label>
                <p className="text-sm text-muted-foreground">
                  Shows checkmark when selected
                </p>
              </div>
            </RadioItem>
          </AreaRadioGroup>
        </div>

        {/* Default Radio Example */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-medium">Radio Button Indicator</h3>
            <p className="text-sm text-muted-foreground">Traditional radio button selection.</p>
          </div>
          <AreaRadioGroup defaultValue="radio1" className="space-y-3">
            <RadioItem value="radio1">
              <div className="flex flex-col">
                <Label>Default Radio</Label>
                <p className="text-sm text-muted-foreground">
                  Uses radio button indicator
                </p>
              </div>
            </RadioItem>
            <RadioItem value="radio2" radioPosition="right">
              <div className="flex flex-col">
                <Label>Right-aligned Radio</Label>
                <p className="text-sm text-muted-foreground">
                  Radio on the right side
                </p>
              </div>
            </RadioItem>
          </AreaRadioGroup>
        </div>
      </div>
    </section>
  );
};

export default TestPage;
