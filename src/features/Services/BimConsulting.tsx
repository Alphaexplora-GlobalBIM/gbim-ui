import ServiceLayout from './ServiceLayout';
const bimConsVideo = "https://www.pexels.com/download/video/5582830/";

export default function BimConsulting() {
    return (
        <ServiceLayout
            title="BIM CONSULTING"
            subtitle="Digital Twins"
            // FIXED IMAGE: Modern architecture / Digital model feel
            image="https://images.pexels.com/photos/5582597/pexels-photo-5582597.jpeg"
            video={bimConsVideo}
            description={`Building Information Modeling (BIM) is more than just 3D software; it is a process that integrates architecture, engineering, and construction. We help firms transition from 2D workflows to intelligent 3D BIM environments.

      Our consulting services cover everything from setting up BIM standards and templates to managing complex clash detection across disciplines (MEP, Structural, Architectural). We act as your BIM Manager, ensuring your digital assets are clean, organized, and truly useful.`}
            benefits={[
                "Reduce Field Conflicts by 90%",
                "LOD 300 to LOD 500 Development",
                "Multi-Trade Clash Detection",
                "4D/5D Simulation Ready Models"
            ]}
            features={[
                { title: "Clash Coordination", desc: "Resolving interference between steel, piping, and HVAC before construction." },
                { title: "Revit & Tekla Integration", desc: "Seamless interoperability between architectural and structural models." },
                { title: "Digital Twins", desc: "Creating data-rich models for facility management and handover." }
            ]}
        />
    );
}
