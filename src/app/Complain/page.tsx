"use client";

import React, { useState, ChangeEvent } from 'react';
import { AlertCircle, Send, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  complaintType: string;
  driverName: string;
  vehicleNumber: string;
  bookingRef: string;
  incidentDate: string;
  incidentTime: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type SubmitStatus = 'success' | 'error' | null;

export default function ComplainPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    complaintType: '',
    driverName: '',
    vehicleNumber: '',
    bookingRef: '',
    incidentDate: '',
    incidentTime: '',
    priority: 'medium',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const complaintTypes: string[] = [
    'Driver Behavior',
    'Vehicle Condition',
    'Service Quality',
    'Billing Issue',
    'Safety Concern',
    'Late Arrival',
    'Route Issue',
    'Other'
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.complaintType) newErrors.complaintType = 'Complaint type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 20)
      newErrors.description = 'Description must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/complain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          complaintType: '',
          driverName: '',
          vehicleNumber: '',
          bookingRef: '',
          incidentDate: '',
          incidentTime: '',
          priority: 'medium',
          description: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit complaint');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">RG Cabs Perth</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-gray-600">+61 435 287 287</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File a Complaint</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve our service. Please provide detailed information about your concern.
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">Complaint Submitted Successfully</h3>
                <p className="text-green-700 mt-1">We'll investigate your complaint and respond within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center">
              <XCircle className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">Submission Failed</h3>
                <p className="text-red-700 mt-1">Please try again or contact us directly at +61 435 287 287</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complaint Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="+61 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="complaintType" className="block text-sm font-semibold text-gray-900 mb-2">
                      Complaint Type *
                    </label>
                    <select
                      id="complaintType"
                      name="complaintType"
                      value={formData.complaintType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 bg-white ${
                        errors.complaintType ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="" className="text-gray-500">Select complaint type</option>
                      {complaintTypes.map((type) => (
                        <option key={type} value={type} className="text-gray-900">{type}</option>
                      ))}
                    </select>
                    {errors.complaintType && <p className="text-red-500 text-sm mt-1">{errors.complaintType}</p>}
                  </div>
                </div>

                {/* Incident Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="driverName" className="block text-sm font-semibold text-gray-900 mb-2">
                        Driver Name (if applicable)
                      </label>
                      <input
                        type="text"
                        id="driverName"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white"
                        placeholder="Driver's name"
                      />
                    </div>

                    <div>
                      <label htmlFor="vehicleNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                        Vehicle Number
                      </label>
                      <input
                        type="text"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white"
                        placeholder="e.g., ABC 123"
                      />
                    </div>

                    <div>
                      <label htmlFor="bookingRef" className="block text-sm font-semibold text-gray-900 mb-2">
                        Booking Reference
                      </label>
                      <input
                        type="text"
                        id="bookingRef"
                        name="bookingRef"
                        value={formData.bookingRef}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white"
                        placeholder="Booking ID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="incidentDate" className="block text-sm font-semibold text-gray-900 mb-2">
                        Incident Date
                      </label>
                      <input
                        type="date"
                        id="incidentDate"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="incidentTime" className="block text-sm font-semibold text-gray-900 mb-2">
                        Incident Time
                      </label>
                      <input
                        type="time"
                        id="incidentTime"
                        name="incidentTime"
                        value={formData.incidentTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Priority Level</label>
                  <div className="flex flex-wrap gap-3">
                    {priorityLevels.map((priority) => (
                      <label key={priority.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.priority === priority.value 
                            ? priority.color + ' ring-2 ring-offset-2 ring-orange-500' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}>
                          {priority.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none text-gray-900 placeholder-gray-500 bg-white ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Please provide a detailed description of your complaint. Include specific details about what happened, when, and how it affected you."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  <p className="text-gray-500 text-sm mt-2">
                    {formData.description.length}/500 characters (minimum 20 required)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Complaint...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Submit Complaint
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">24/7 Phone Support</p>
                    <p className="text-gray-600">+61 435 287 287</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">rgcabsperth@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Our Commitment</h3>
              <p className="text-orange-800 text-sm">
                We take all complaints seriously and are committed to resolving issues promptly and fairly. 
                Your feedback helps us maintain the highest standards of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}