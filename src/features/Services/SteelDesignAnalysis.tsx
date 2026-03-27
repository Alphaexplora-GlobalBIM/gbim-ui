import ServiceLayout from './ServiceLayout';
const steelDesignVideo = "https://res.cloudinary.com/dqapo8elj/video/upload/steeldesign.mp4";

export default function SteelDesignAnalysis() {
    return (
        <ServiceLayout
            title="DESIGN & ANALYSIS"
            subtitle="Engineering Integrity"
            image="https://www.taaltech.com/wp-content/uploads/2025/08/AdobeStock_555709946-scaled.jpeg"
            video={steelDesignVideo}
            description={`Our engineering team provides comprehensive structural analysis and design services. We don't just detail; we engineer solutions that are safe, compliant, and cost-effective.

      Using state-of-the-art FEA (Finite Element Analysis) tools, we simulate real-world loads—including wind, seismic, and dynamic forces—to ensure your structure performs perfectly. We work closely with architects to maintain aesthetic vision while guaranteeing structural stability.`}
            benefits={[
                "Stamped Engineering Calculations",
                "Value Engineering & Optimization",
                "Seismic & Wind Load Analysis",
                "Foundation Load Reactions"
            ]}
            features={[
                { title: "Connection Engineering", desc: "Custom connection design to reduce fabrication costs." },
                { title: "3D Frame Analysis", desc: "Full structural simulation for complex geometry behavior." },
                { title: "Code Compliance", desc: "Adherence to AISC, BS, Eurocode, and local building standards." }
            ]}
        />
    );
}
