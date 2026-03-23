'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CloseIcon from '@mui/icons-material/Close';
import './educationModal.css';

const educationSchema = z.object({
    school: z.string().min(1, 'School is required'),
    degree: z.string().min(1, 'Degree is required'),
    fieldOfStudy: z.string().min(1, 'Field of study is required'),
    startMonth: z.string().min(1, 'Start month is required'),
    startYear: z.string().min(1, 'Start year is required'),
    endMonth: z.string().min(1, 'End month is required'),
    endYear: z.string().min(1, 'End year is required'),
    grade: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

export default function EducationModal({ isOpen, onClose }: EducationModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data: EducationFormValues) => {
        const educationData = {
            school : data.school,
            degree : data.degree,
            fieldOfStudy : data.grade,
            grade : data.grade,
            startTime: data.startMonth + " " + data.startYear,
            endTime : data.endMonth + " " + data.endYear
        }
        console.log("Education data submitted: ", educationData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add education</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                    <div className="modal-body">
                        <p className="modal-required-text">* Indicates required</p>

                        <div className="form-group">
                            <label htmlFor="school">School*</label>
                            <input
                                id="school"
                                placeholder="Ex: Boston University"
                                {...register('school')}
                                className={errors.school ? 'error' : ''}
                            />
                            {errors.school && <span className="error-message">{errors.school.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="degree">Degree*</label>
                            <input
                                id="degree"
                                placeholder="Ex: Bachelor's"
                                {...register('degree')}
                                className={errors.degree ? 'error' : ''}
                            />
                            {errors.degree && <span className="error-message">{errors.degree.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fieldOfStudy">Field of study*</label>
                            <input
                                id="fieldOfStudy"
                                placeholder="Ex: Business"
                                {...register('fieldOfStudy')}
                                className={errors.fieldOfStudy ? 'error' : ''}
                            />
                            {errors.fieldOfStudy && <span className="error-message">{errors.fieldOfStudy.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Start date*</label>
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
                            <label>End date (or expected)*</label>
                            <div className="form-row">
                                <div className="form-group-item">
                                    <select
                                        id="endMonth"
                                        {...register('endMonth')}
                                        className={errors.endMonth ? 'error' : ''}
                                    >
                                        <option value="">Month</option>
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    {errors.endMonth && <span className="error-message">{errors.endMonth.message}</span>}
                                </div>
                                <div className="form-group-item">
                                    <select
                                        id="endYear"
                                        {...register('endYear')}
                                        className={errors.endYear ? 'error' : ''}
                                    >
                                        <option value="">Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.endYear && <span className="error-message">{errors.endYear.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="grade">Grade</label>
                            <input
                                id="grade"
                                {...register('grade')}
                            />
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
