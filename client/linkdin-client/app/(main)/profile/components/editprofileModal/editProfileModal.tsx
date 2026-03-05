import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CloseIcon from '@mui/icons-material/Close';
import './editProfileModal.css';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { apiUpdateProfile } from '../../../../services/profileApi';


const profileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    headline: z.string().min(1, 'Headline is required'),
    country: z.string().min(1, 'Country/Region is required'),
    city: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {

     const user = useSelector((state: RootState) => state.auth.currentUser)


    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            headline: 'Software Engineer',
            country: 'India',
            city: '',
        }
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

    const onSubmit = async (data: ProfileFormValues) => {
        console.log("Form data submitted: ", data);
        const User ={
            fullname:data.firstName+data.lastName,
            description:data.headline
        }
        await apiUpdateProfile(user?.firebase_id,User)
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit intro</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                    <div className="modal-body">
                        <p className="modal-required-text">* Indicates required</p>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name*</label>
                                <input
                                    id="firstName"
                                    {...register('firstName')}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name*</label>
                                <input
                                    id="lastName"
                                    {...register('lastName')}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="headline">Headline*</label>
                            <textarea
                                id="headline"
                                rows={2}
                                {...register('headline')}
                                className={errors.headline ? 'error' : ''}
                            />
                            {errors.headline && <span className="error-message">{errors.headline.message}</span>}
                        </div>

                        <h3 className="modal-section-title">Location</h3>

                        <div className="form-group">
                            <label htmlFor="country">Country/Region*</label>
                            <input
                                id="country"
                                {...register('country')}
                                className={errors.country ? 'error' : ''}
                            />
                            {errors.country && <span className="error-message">{errors.country.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                {...register('city')}
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
