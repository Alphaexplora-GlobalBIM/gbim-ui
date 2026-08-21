import ServiceLayout from './ServiceLayout';
const preengrVideo = "https://www.pexels.com/download/video/33893537/";

export default function PreEngineeredBuildings() {
    return (
        <ServiceLayout
            title="PRE-ENGINEERED BUILDINGS"
            subtitle="Rapid Construction"
            // FIXED IMAGE: Industrial warehouse frame structure
            image="https://images.pexels.com/photos/32239084/pexels-photo-32239084.jpeg"
            video={preengrVideo}
            description={`We are industry leaders in detailing Pre-Engineered Buildings (PEB), ensuring seamless integration of primary frames, secondary members, and cladding systems.

      Our team utilizes specialized MBS and Tekla workflows to optimize steel weight without compromising structural integrity. Whether for warehouses, aircraft hangars, or industrial factories, our PEB detailing prioritizes speed and accuracy to get your Anchor Bolt plans approved and your steel on-site faster.`}
            benefits={[
                "Fast-Track Anchor Bolt Plans",
                "Weight Optimization Strategies",
                "Full Accessory Integration (Vents, Doors)",
                "Cold-Formed Steel Expertise"
            ]}
            features={[
                { title: "Primary Framing", desc: "Tapered columns and rafters optimized for plate usage." },
                { title: "Sheeting & Trim", desc: "Precise layouts for roof/wall panels and flashing details." },
                { title: "Approval Drawings", desc: "Quick turnaround GA drawings to secure project sign-off." }
            ]}
        />
    );
}
