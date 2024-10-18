"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema for form validation using zod
const FormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  dataTypes: z
    .array(z.string())
    .min(1, "You must select at least one data type"),
  consentExpiry: z.string().min(1, "Please select consent expiry"),
  description: z.string().min(1, "Description is required"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

export default function ConsentPage() {
  // Initializing the form with default values and validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "",
      dataTypes: [],
      consentExpiry: "",
      description: "",
      agreeToTerms: false,
    },
  });

  // Form submission logic
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Handle form submission (e.g., sending data to an API, etc.)
      console.log("Form Data:", data);
      form.reset(); // Reset form after submission
      return;
    } catch (error) {
      return error;
    }
  }

  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className="text-3xl font-semibold tracking-tight">Consent Form</h1>
        <p className="leading-7 text-sm dark:text-gray-400">
          Please provide consent for the data we can access and use.
        </p>

        {/* Form start */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[600px] space-y-4 mt-[1rem]"
          >
            {/* Company Field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data Types Selection */}
            <FormField
              control={form.control}
              name="dataTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Data Types You Agree to Share</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Checkbox
                        onCheckedChange={(isChecked) =>
                          isChecked
                            ? field.onChange([...field.value, "Location Data"])
                            : field.onChange(
                                field.value.filter((v) => v !== "Location Data")
                              )
                        }
                        checked={field.value.includes("Location Data")}
                      />
                      Location Data
                      <Checkbox
                        onCheckedChange={(isChecked) =>
                          isChecked
                            ? field.onChange([
                                ...field.value,
                                "Purchase History",
                              ])
                            : field.onChange(
                                field.value.filter(
                                  (v) => v !== "Purchase History"
                                )
                              )
                        }
                        checked={field.value.includes("Purchase History")}
                      />
                      Purchase History
                      <Checkbox
                        onCheckedChange={(isChecked) =>
                          isChecked
                            ? field.onChange([
                                ...field.value,
                                "Browsing History",
                              ])
                            : field.onChange(
                                field.value.filter(
                                  (v) => v !== "Browsing History"
                                )
                              )
                        }
                        checked={field.value.includes("Browsing History")}
                      />
                      Browsing History
                      <Checkbox
                        onCheckedChange={(isChecked) =>
                          isChecked
                            ? field.onChange([
                                ...field.value,
                                "All",
                              ])
                            : field.onChange(
                                field.value.filter(
                                  (v) => v !== "All"
                                )
                              )
                        }
                        checked={field.value.includes("Purchase History")}
                      />
                      All
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Consent Expiry Selection */}
            <FormField
              control={form.control}
              name="consentExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Consent Expiry</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border border-gray-300 p-2 rounded-md w-full"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                      <option value="indefinite">Indefinite</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Briefly describe the purpose of data usage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agree to Terms */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="ml-2">
                      I agree to the{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        className="underline text-blue-500"
                      >
                        Privacy Policy
                      </a>{" "}
                      and Terms of Service.
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
