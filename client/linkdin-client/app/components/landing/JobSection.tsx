import './JobSection.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function JobSection() {
    const jobCategories = [
        "Career", "Productivity", "Finance", "Soft Skills & Emotional Intelligence",
        "Project Management", "Education", "Technology", "Leadership", "Ecommerce"
    ];

    return (
        <section className="job-section">
            <div className="job-container">
                <div className="job-left">
                    <h2>Explore top LinkedIn content</h2>
                    <p>Discover relevant posts and expert insights — curated by topic and in one place.</p>
                </div>
                <div className="job-right">
                    <div className="job-pills">
                        {jobCategories.map((category, index) => (
                            <div key={index} className="job-pill">
                                {category}
                            </div>
                        ))}
                         <button className="show-more">Show all</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
