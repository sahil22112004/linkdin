import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="landing-footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <span className="footer-linkedin-text">Linked</span>
                    <span className="footer-linkedin-in">in</span>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>General</h4>
                        <Link href="#">Sign Up</Link>
                        <Link href="#">Help Center</Link>
                        <Link href="#">About</Link>
                        <Link href="#">Press</Link>
                        <Link href="#">Blog</Link>
                        <Link href="#">Careers</Link>
                        <Link href="#">Developers</Link>
                    </div>
                    <div className="footer-column">
                        <h4>Browse LinkedIn</h4>
                        <Link href="#">Learning</Link>
                        <Link href="#">Jobs</Link>
                        <Link href="#">Salary</Link>
                        <Link href="#">Mobile</Link>
                        <Link href="#">Services</Link>
                        <Link href="#">Products</Link>
                        <Link href="#">Top Companies</Link>
                    </div>
                    <div className="footer-column">
                        <h4>Business Solutions</h4>
                        <Link href="#">Talent</Link>
                        <Link href="#">Marketing</Link>
                        <Link href="#">Sales</Link>
                        <Link href="#">Learning</Link>
                    </div>
                    <div className="footer-column">
                        <h4>Directories</h4>
                        <Link href="#">Members</Link>
                        <Link href="#">Jobs</Link>
                        <Link href="#">Companies</Link>
                        <Link href="#">Salaries</Link>
                        <Link href="#">Universities</Link>
                        <Link href="#">Top Jobs</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
