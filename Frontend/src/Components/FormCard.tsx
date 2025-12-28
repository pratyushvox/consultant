import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";

import  type { ReactNode } from "react";

interface ProfileCardProps {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;   
  children: ReactNode;       
  footer?: ReactNode;        
}

const FormCard = ({
  title,
  subtitle,
  headerRight,
  children,
  footer,
}: ProfileCardProps) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {subtitle && (
            <CardDescription>{subtitle}</CardDescription>
          )}
        </div>

        {headerRight && <div>{headerRight}</div>}
      </CardHeader>

      <CardContent className="space-y-4">
        {children}
      </CardContent>

      {footer && (
        <CardFooter className="flex justify-end gap-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default FormCard;
