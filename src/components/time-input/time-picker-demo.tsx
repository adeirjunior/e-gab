"use client";
 
import {Dispatch, useRef, SetStateAction} from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
 
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date>>;
  disabled?: boolean;
}
 
export function TimePickerDemo({ date, setDate, disabled }: TimePickerDemoProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
 
  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Horas
        </Label>
        <TimePickerInput
          picker="hours"
          disabled={disabled}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutos
        </Label>
        <TimePickerInput
          picker="minutes"
          disabled={disabled}
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}