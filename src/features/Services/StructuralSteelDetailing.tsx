import ServiceLayout from './ServiceLayout';
const steelVideo = "https://res.cloudinary.com/dqapo8elj/video/upload/steel.mp4";

export default function StructuralSteelDetailing() {
    return (
        <ServiceLayout
            title="STRUCTURAL STEEL DETAILING"
            subtitle="Precision Fabrication"
            // FIXED IMAGE: High-rise steel construction
            image="https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?auto=format&fit=crop&q=80"
            video={steelVideo}
            description={`Our core expertise lies in providing high-precision structural steel detailing for commercial, industrial, and infrastructure projects. 
      
      Using advanced Tekla Structures software, we create fabrication-ready shop drawings that ensure zero-error assembly on site. We manage complex geometries and massive tonnage projects with ease, delivering comprehensive data packages that drive your CNC machinery and procurement processes.`}
            benefits={[
                "LOD 400/500 Fabrication Models",
                "NC Files (DSTV) & DXF for CNC",
                "Advance Bill of Materials (ABM)",
                "Zero-Conflict Erection Plans"
            ]}
            features={[
                { title: "Shop Drawings", desc: "Fully dimensioned single part and assembly drawings for fabrication." },
                { title: "Erection Drawings", desc: "Clear, color-coded GA plans for safe and fast site installation." },
                { title: "Connection Design", desc: "Stamped calculations and connection detailing per AISC/Eurocode." }
            ]}
        />
    );
}
