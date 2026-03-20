'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CloseIcon from '@mui/icons-material/Close';
import './experienceModal.css';

const experienceSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    employmentType: z.string().min(1, 'Employment type is required'),
    company: z.string().min(1, 'Company or organization is required'),
    location: z.string().min(1, 'Location is required'),
    startMonth: z.string().min(1, 'Start month is required'),
    startYear: z.string().min(1, 'Start year is required'),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => (currentYear - i).toString());

export default function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data: ExperienceFormValues) => {
        console.log("Experience data submitted: ", data);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add experience</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                    <div className="modal-body">
                        <p className="modal-required-text">* Indicates required</p>

                        <div className="form-group">
                            <label htmlFor="title">Title*</label>
                            <input
                                id="title"
                                placeholder="Ex: Retail Sales Manager"
                                {...register('title')}
                                className={errors.title ? 'error' : ''}
                            />
                            {errors.title && <span className="error-message">{errors.title.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="employmentType">Employment type*</label>
                            <select
                                id="employmentType"
                                {...register('employmentType')}
                                className={errors.employmentType ? 'error' : ''}
                            >
                                <option value="">Please select</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Self-employed">Self-employed</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Internship">Internship</option>
                                <option value="Apprenticeship">Apprenticeship</option>
                            </select>
                            {errors.employmentType && <span className="error-message">{errors.employmentType.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company or organization*</label>
                            <input
                                id="company"
                                placeholder="Ex: Microsoft"
                                {...register('company')}
                                className={errors.company ? 'error' : ''}
                            />
                            {errors.company && <span className="error-message">{errors.company.message}</span>}
                        </div>

                       
                        <div className="form-group">
                            <label>Start time*</label>
                            <div className="form-row">
                                <div className="form-group-item">
                                    <select
                                        id="startMonth"
                                        {...register('startMonth')}
                                        className={errors.startMonth ? 'error' : ''}
                                    >
                                        <option value="">Month</option>
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    {errors.startMonth && <span className="error-message">{errors.startMonth.message}</span>}
                                </div>
                                <div className="form-group-item">
                                    <select
                                        id="startYear"
                                        {...register('startYear')}
                                        className={errors.startYear ? 'error' : ''}
                                    >
                                        <option value="">Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.startYear && <span className="error-message">{errors.startYear.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>End time (optional)</label>
                            <div className="form-row">
                                <div className="form-group-item">
                                    <select
                                        id="endMonth"
                                        {...register('endMonth')}
                                    >
                                        <option value="">Month</option>
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="form-group-item">
                                    <select
                                        id="endYear"
                                        {...register('endYear')}
                                    >
                                        <option value="">Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="location">Location*</label>
                            <input
                                id="location"
                                placeholder="Ex: London, United Kingdom"
                                {...register('location')}
                                className={errors.location ? 'error' : ''}
                            />
                            {errors.location && <span className="error-message">{errors.location.message}</span>}
                        </div>


                    </div>


                    <div className="modal-footer">
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
