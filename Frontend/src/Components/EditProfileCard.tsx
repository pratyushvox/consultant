import { useState } from "react";
import { toast } from "react-toastify";

import FormCard from "@/Components/FormCard";
import FormField from "@/Components/Common/FormFiled";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import type { Applicant } from "@/types/applicants";
import { updateApplicant } from "@/Services/ApplicantService";

interface ApplicantProfileEditProps {
  applicant: Applicant;
  onSave: (data: Applicant) => void;
  onCancel: () => void;
}

const ApplicantProfileEdit = ({
  applicant,
  onSave,
  onCancel,
}: ApplicantProfileEditProps) => {
  const [form, setForm] = useState<Applicant>(applicant);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (key: keyof Applicant, value: any, index?: number, nestedKey?: string) => {
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
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateApplicant(form);
      onSave(updated);
      toast.success("Changes saved successfully!");
    } catch (err) {
      console.error("Failed to save applicant:", err);
      toast.error("Failed to save changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const getError = (key: string) => errors[key] || "";

  return (
    <FormCard
      title="Edit Applicant"
      subtitle={applicant.email}
      footer={
        <>
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            className="bg-[#45d59e] hover:bg-[#3cb58a]"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </>
      }
    >
      {/* ---------------- Personal Info ---------------- */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Name" error={getError("name")}>
          <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
        </FormField>

        <FormField label="Phone" error={getError("phone")}>
          <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
        </FormField>

        <FormField label="Gender" error={getError("gender")}>
          <Select value={form.gender} onValueChange={(value) => updateField("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Date of Birth" error={getError("dateOfBirth")}>
          <Input type="date" value={form.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} />
        </FormField>

        <FormField label="City" error={getError("city")}>
          <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} />
        </FormField>

        <FormField label="Address" error={getError("address")}>
          <Input value={form.address} onChange={(e) => updateField("address", e.target.value)} />
        </FormField>
      </section>

      {/* ---------------- Academic / Interests ---------------- */}
      <section className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Interested Country" error={getError("interestedCountry")}>
          <Input value={form.interestedCountry} onChange={(e) => updateField("interestedCountry", e.target.value)} />
        </FormField>

        <FormField label="Interested Course" error={getError("interestedCourse")}>
          <Input value={form.interestedCourse} onChange={(e) => updateField("interestedCourse", e.target.value)} />
        </FormField>

        <FormField label="Highest Qualification" error={getError("highestQualification")}>
          <Input value={form.highestQualification} onChange={(e) => updateField("highestQualification", e.target.value)} />
        </FormField>

        <FormField label="Passport Number" error={getError("passportNumber")}>
          <Input value={form.passportNumber} onChange={(e) => updateField("passportNumber", e.target.value)} />
        </FormField>

        <FormField label="Citizenship" error={getError("citizenship")}>
          <Input value={form.citizenship} onChange={(e) => updateField("citizenship", e.target.value)} />
        </FormField>

        <FormField label="English Test" error={getError("englishTest")}>
          <Input value={form.englishTest || ""} onChange={(e) => updateField("englishTest", e.target.value)} />
        </FormField>

        <FormField label="Overall Score" error={getError("overallScore")}>
          <Input type="number" value={form.overallScore || ""} onChange={(e) => updateField("overallScore", Number(e.target.value))} />
        </FormField>
      </section>

      {/* ---------------- Academic History ---------------- */}
      <section className="mt-4">
        <h4 className="font-semibold mb-2">Academic History</h4>
        {form.academicHistory.map((rec, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
            <FormField label="Institution">
              <Input value={rec.institution} onChange={(e) => updateField("academicHistory", e.target.value, idx, "institution")} />
            </FormField>
            <FormField label="Qualification">
              <Input value={rec.qualification} onChange={(e) => updateField("academicHistory", e.target.value, idx, "qualification")} />
            </FormField>
            <FormField label="Major">
              <Input value={rec.major} onChange={(e) => updateField("academicHistory", e.target.value, idx, "major")} />
            </FormField>
            <FormField label="Year Completed">
              <Input type="number" value={rec.yearCompleted} onChange={(e) => updateField("academicHistory", Number(e.target.value), idx, "yearCompleted")} />
            </FormField>
            <FormField label="Grade">
              <Input value={rec.grade} onChange={(e) => updateField("academicHistory", e.target.value, idx, "grade")} />
            </FormField>
          </div>
        ))}
      </section>

      {/* ---------------- Financial & Guardian ---------------- */}
      <section className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Budget Required">
          <Input value={form.budgetRequired} onChange={(e) => updateField("budgetRequired", e.target.value)} />
        </FormField>

        <FormField label="Financial Capacity">
          <Input value={form.financialCapacity} onChange={(e) => updateField("financialCapacity", e.target.value)} />
        </FormField>

        <FormField label="Preferred Intake">
          <Input value={form.preferredIntake} onChange={(e) => updateField("preferredIntake", e.target.value)} />
        </FormField>

        <FormField label="Guardian Name">
          <Input value={form.guardian.guardianName} onChange={(e) => updateField("guardian", e.target.value, undefined, "guardianName")} />
        </FormField>

        <FormField label="Guardian Phone">
          <Input value={form.guardian.guardianPhone} onChange={(e) => updateField("guardian", e.target.value, undefined, "guardianPhone")} />
        </FormField>

        <FormField label="Guardian Relation">
          <Input value={form.guardian.guardianRelation} onChange={(e) => updateField("guardian", e.target.value, undefined, "guardianRelation")} />
        </FormField>
      </section>

      {/* ---------------- Remarks ---------------- */}
      <FormField label="Remarks" error={getError("remarks")}>
        <Textarea value={form.remarks} onChange={(e) => updateField("remarks", e.target.value)} />
      </FormField>
    </FormCard>
  );
};

export default ApplicantProfileEdit;
