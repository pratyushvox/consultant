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

  const updateField = (key: keyof Applicant, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateApplicant(form);
      onSave(updated);
      toast.success("changes Edited Succesfully");
    } catch (err) {
      console.error("Failed to save applicant:", err);
      alert("Failed to save changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormCard
      title={`Edit Profile`}
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
      {/* PERSONAL INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Name">
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </FormField>

        <FormField label="Phone">
          <Input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </FormField>

        <FormField label="Gender">
          <Select
            value={form.gender}
            onValueChange={(value) => updateField("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Date of Birth">
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />
        </FormField>
      </section>

      {/* ACADEMIC INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Interested Country">
          <Input
            value={form.interestedCountry}
            onChange={(e) =>
              updateField("interestedCountry", e.target.value)
            }
          />
        </FormField>

        <FormField label="Interested Course">
          <Input
            value={form.interestedCourse}
            onChange={(e) =>
              updateField("interestedCourse", e.target.value)
            }
          />
        </FormField>
      </section>

      {/* REMARKS */}
      <FormField label="Remarks">
        <Textarea
          value={form.remarks}
          onChange={(e) => updateField("remarks", e.target.value)}
        />
      </FormField>
    </FormCard>
  );
};

export default ApplicantProfileEdit;
