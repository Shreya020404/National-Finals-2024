"use client";
import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema using zod
const FormSchema = z.object({
  category: z.string(),
  financialPlatform: z.string().min(1, "Please select a financial platform"),
  description: z.string().min(1, "Description is required"),
});

export default function Category() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      financialPlatform: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      console.log("Form Data:", data);
      // Perform your submission logic here (e.g., API call)
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className="text-3xl font-semibold tracking-tight">
          Financial Data Report
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400">
          Below, you can track where your financial data has been used, such as
          websites or apps you&apos;ve logged into, or banks that have accessed
          your data.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[600px] space-y-3 mt-[1rem]"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>
                    Enter random piece of information
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Type any random info"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Financial Platform Selection */}
            <FormField
              control={form.control}
              name="financialPlatform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>
                    Select Financial Platform
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      id={field.name}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select a platform
                      </option>
                      <option value="Bank of America">Bank of America</option>
                      <option value="Chase Bank">Chase Bank</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Venmo">Venmo</option>
                      <option value="Mint">Mint</option>
                      <option value="Robinhood">Robinhood</option>
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
                  <FormLabel htmlFor={field.name}>Enter Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Briefly describe the data usage or action taken"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
