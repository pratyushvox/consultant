import { useState } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import FormCard from "@/Components/FormCard";
import FormField from "@/Components/Common/FormFiled";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

import { addApplicantSchema, type AddApplicantInput } from "@/Schema/Applicants";
import { addApplicant } from "@/Services/ApplicantService";
import { z } from "zod";

interface AddApplicantDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddApplicantDialog = ({ open, onClose, onAdd }: AddApplicantDialogProps) => {
  const [form, setForm] = useState<AddApplicantInput>({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    dateOfBirth: "",
    interestedCountry: "",
    interestedCourse: "",
    city: "",
    highestQualification: "",
    academicHistory: [
      { institution: "", qualification: "", major: "", yearCompleted: new Date().getFullYear(), grade: "" },
    ],
    passportNumber: "",
    citizenship: "",
    documents: [],
    guardian: { guardianName: "", guardianPhone: "", guardianRelation: "" },
    budgetRequired: "",
    financialCapacity: "",
    preferredIntake: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const stepSchemas = {
    1: addApplicantSchema.pick({
      name: true,
      phone: true,
      email: true,
      gender: true,
      dateOfBirth: true,
      city: true,
      interestedCountry: true,
      interestedCourse: true,
    }),
    2: addApplicantSchema.pick({
      highestQualification: true,
      academicHistory: true,
      documents: true,
    }),
    3: addApplicantSchema.pick({
      passportNumber: true,
      citizenship: true,
      documents: true,
    }),
    4: addApplicantSchema.pick({
      guardian: true,
      budgetRequired: true,
      financialCapacity: true,
      preferredIntake: true,
      remarks: true,
    }),
  };

  const updateField = (
    key: keyof AddApplicantInput,
    value: any,
    index?: number,
    nestedKey?: string
  ) => {
    setForm(prev => {
      const updated = { ...prev };

      if (nestedKey && index !== undefined && Array.isArray(prev[key])) {
        const arr = [...(prev[key] as any[])];
        arr[index] = { ...arr[index], [nestedKey]: value };
        updated[key] = arr as any;
      } else if (nestedKey && typeof prev[key] === "object") {
        updated[key] = { ...(prev[key] as any), [nestedKey]: value };
      } else {
        updated[key] = value;
      }

      return updated;
    });

    const errorKey =
      nestedKey && index !== undefined
        ? `${key}.${index}.${nestedKey}`
        : nestedKey
        ? `${key}.${nestedKey}`
        : key;

    setErrors(prev => ({ ...prev, [errorKey]: "" }));
  };

  const handleNext = () => {
    const schema = stepSchemas[step as keyof typeof stepSchemas];

    try {
      schema.parse(form);
      setErrors({});
      setStep(prev => prev + 1);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach(issue => {
          fieldErrors[issue.path.join(".")] = issue.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix the errors before continuing.");
      }
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSave = async () => {
    try {
      const validatedData = addApplicantSchema.parse(form);
      setSaving(true);

      const newApplicant = await addApplicant(validatedData);
      onAdd(newApplicant);

      toast.success("Applicant added successfully!");
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach(issue => {
          fieldErrors[issue.path.join(".")] = issue.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form.");
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const getError = (path: string) => errors[path] || "";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Add Applicant</DialogTitle>
        </DialogHeader>

        <FormCard
          title={`Step ${step} of 4`}
          subtitle="Please fill in the details"
          footer={
            <div className="flex justify-between mt-6 gap-2">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} disabled={saving}>
                  Back
                </Button>
              )}
              {step < 4 && (
                <Button className="bg-[#45d59e]" onClick={handleNext}>
                  Next
                </Button>
              )}
              {step === 4 && (
                <Button className="bg-[#45d59e]" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Add Applicant"}
                </Button>
              )}
            </div>
          }
        >
          {step === 1 && (
            <section className="grid grid-cols-2 gap-4">
              {["name", "phone", "email", "dateOfBirth", "city", "interestedCountry", "interestedCourse"].map(field => (
                <FormField key={field} label={field.replace(/([A-Z])/g, " $1")}>
                  <Input
                    type={field === "dateOfBirth" ? "date" : "text"}
                    value={(form as any)[field]}
                    onChange={e => updateField(field as any, e.target.value)}
                  />
                  {getError(field) && (
                    <span className="text-sm text-red-500 mt-1 block">
                      {getError(field)}
                    </span>
                  )}
                </FormField>
              ))}
            </section>
          )}

          {step === 2 && (
            <section className="grid gap-4">
              <FormField label="Highest Qualification">
                <Input
                  value={form.highestQualification}
                  onChange={e => updateField("highestQualification", e.target.value)}
                />
                {getError("highestQualification") && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {getError("highestQualification")}
                  </span>
                )}
              </FormField>
            </section>
          )}

          {step === 3 && (
            <section className="grid gap-4">
              {["passportNumber", "citizenship"].map(field => (
                <FormField key={field} label={field.replace(/([A-Z])/g, " $1")}>
                  <Input
                    value={(form as any)[field]}
                    onChange={e => updateField(field as any, e.target.value)}
                  />
                  {getError(field) && (
                    <span className="text-sm text-red-500 mt-1 block">
                      {getError(field)}
                    </span>
                  )}
                </FormField>
              ))}
            </section>
          )}

          {step === 4 && (
            <section className="grid grid-cols-2 gap-4">
              {["guardianName", "guardianPhone", "guardianRelation"].map(key => (
                <FormField key={key} label={key.replace(/([A-Z])/g, " $1")}>
                  <Input
                    value={(form.guardian as any)[key]}
                    onChange={e => updateField("guardian", e.target.value, undefined, key)}
                  />
                  {getError(`guardian.${key}`) && (
                    <span className="text-sm text-red-500 mt-1 block">
                      {getError(`guardian.${key}`)}
                    </span>
                  )}
                </FormField>
              ))}

              <FormField label="Remarks">
                <Textarea
                  value={form.remarks}
                  onChange={e => updateField("remarks", e.target.value)}
                />
                {getError("remarks") && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {getError("remarks")}
                  </span>
                )}
              </FormField>
            </section>
          )}
        </FormCard>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicantDialog;

