"use client"
import Input from '@/components/layout/Input';
import { useAppContext } from '@/context/AppContext'
import axios from 'axios';
import { Save } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const { loading,setLoading } = useAppContext();
  const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        "/api/v1/auth/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      if (data.success) {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };
    
return (
    <div className='flex flex-col items-center justify-center'>
      <div className='border-2 border-indigo-400 w-full max-w-5xl min-h-fit rounded-2xl '>
        <div className='flex flex-col items-center justify-center pt-10 px-5'>
          <div className='text-lg lg:text-4xl text-indigo-400 uppercase tracking-wider py-2 font-bold'>Change Password</div>
          <div className='text-sm lg:text-lg '>Update your account password</div>
        </div>
        <div className="rounded-2xl p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className='flex items-center justify-center py-4'>
              <button
              type="submit"
              disabled={loading}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-70"
              >
              <Save size={18} />
              {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
