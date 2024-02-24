'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/lib/api/auth.helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});
export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match.',
      });
      return;
    }
    const res = await register({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    if (res) {
      console.log(res);
    }
  }

  return (
        <div className="px-6 py-20 lg:px-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              Become a member
            </h2>
          </div>
          <div className="mt-2 sm:mx-auto sm:max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-7xl"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem style={{ margin: 0 }}>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter your email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>Please enter your name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please confirm your password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="submit"
                  style={{
                    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset',
                  }}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Button asChild variant='link'>
                  <Link href={'/signin'}>Sign in here</Link>
              </Button>
            </p>
          </div>
        </div>
  );
}
