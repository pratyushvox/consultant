import  type { ReactNode } from "react";
import { Label } from "@/Components/ui/label";

interface ProfileFieldProps {
  label: string;
  children: ReactNode;
}

const FormField = ({ label, children }: ProfileFieldProps) => {
  return (
    <div className="grid gap-1">
      <Label className="text-muted-foreground text-xs">
        {label}
      </Label>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default FormField;
