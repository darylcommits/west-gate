import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useSubmitInquiry } from '../../hooks/useInquiries';
import { useAuth } from '../../hooks/useAuth';

const ContactPage = () => {
  const location = useLocation();
  const { user, profile } = useAuth();
  const submitInquiry = useSubmitInquiry();
  const propertyQuery = location.state?.propertyQuery || '';

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    // Pre-fill if logged in or navigating from a property
    if (profile) {
      setValue('name', profile.full_name || '');
      setValue('email', profile.email || user?.email || '');
      setValue('phone', profile.phone || '');
    }
    if (propertyQuery) {
      setValue('message', `I am interested in ${propertyQuery}. Please provide me with more details.`);
    }
  }, [profile, user, propertyQuery, setValue]);

  const onSubmit = async (data) => {
    try {
      await submitInquiry.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        client_id: user?.id || null,
        status: 'new'
      });
      reset({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="w-full bg-cream-50 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="bg-navy-900 py-16 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Contact Us</h1>
        <p className="text-cream-50/80 text-lg max-w-2xl mx-auto">
          Have a question about a property or need assistance with your real estate needs? We are here to help.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12">
          
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our team of dedicated professionals is ready to assist you. Reach out to us via phone, email, or by filling out the contact form.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-crimson-600 shrink-0">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Office Address</h3>
                  <p className="text-gray-600">Cabigbigaan, Santo Domingo<br/>Ilocos Sur</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-crimson-600 shrink-0">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Phone Number</h3>
                  <p className="text-gray-600">0939 493 4234</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-crimson-600 shrink-0">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Email Address</h3>
                  <p className="text-gray-600">westgaterealestateserviceshr@gmail.com</p>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-navy-900/5 border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Juan Dela Cruz"
                    {...register('name', { required: 'Name is required' })}
                    error={errors.name?.message}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="juan@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    error={errors.email?.message}
                  />
                </div>

                <Input
                  label="Phone Number"
                  placeholder="+63 900 000 0000"
                  {...register('phone', { required: 'Phone number is required' })}
                  error={errors.phone?.message}
                />

                <Textarea
                  label="Message"
                  placeholder="How can we help you?"
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  error={errors.message?.message}
                />

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  isLoading={submitInquiry.isPending}
                  rightIcon={<FiSend />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
