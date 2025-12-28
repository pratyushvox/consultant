import { useState } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import ProfileCard from "@/Components/FormCard";
import ProfileField from "@/Components/Common/FormFiled";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select";

import { addApplicantSchema,type AddApplicantInput } from "@/Schema/Applicants";
import type { Applicant } from "@/types/applicants";
import { addApplicant } from "@/Services/ApplicantService";

interface AddApplicantDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AddApplicantInput) => void;
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
    remarks: "",
  });

  const [saving, setSaving] = useState(false);

  const updateField = (key: keyof AddApplicantInput, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
  try {
    const validatedData = addApplicantSchema.parse(form);
    setSaving(true);
    const newApplicant = await addApplicant(validatedData); // call the service
    onAdd(newApplicant); 
    toast.success("Applicant added successfully!");
    onClose();
  } catch (err) {
    if (err instanceof Error) toast.error(err.message);
  } finally {
    setSaving(false);
  }
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Add Applicant</DialogTitle>
        </DialogHeader>

        <ProfileCard
          title="New Applicant"
          subtitle="Fill in the details"
          footer={
            <>
              <Button variant="outline" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button className="bg-[#45d59e] hover:bg-[#3cb58a]" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Add Applicant"}
              </Button>
            </>
          }
        >
          <section className="grid grid-cols-2 gap-4">
            <ProfileField label="Name">
              <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
            </ProfileField>

            <ProfileField label="Phone">
              <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </ProfileField>

            <ProfileField label="Email">
              <Input value={form.email} onChange={(e) => updateField("email", e.target.value)} />
            </ProfileField>

            <ProfileField label="Gender">
              <Select value={form.gender} onValueChange={(value) => updateField("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </ProfileField>

            <ProfileField label="Date of Birth">
              <Input type="date" value={form.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} />
            </ProfileField>

            <ProfileField label="Interested Country">
              <Input value={form.interestedCountry} onChange={(e) => updateField("interestedCountry", e.target.value)} />
            </ProfileField>

            <ProfileField label="Interested Course">
              <Input value={form.interestedCourse} onChange={(e) => updateField("interestedCourse", e.target.value)} />
            </ProfileField>

            <ProfileField label="City">
              <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} />
            </ProfileField>
          </section>

          <ProfileField label="Remarks">
            <Textarea value={form.remarks} onChange={(e) => updateField("remarks", e.target.value)} />
          </ProfileField>
        </ProfileCard>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicantDialog;
