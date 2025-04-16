import Sponsor from '@/app/(home)/Sponsor';
import SectionHeader from '@/components/SectionHeader';


export default function Sponsors() {
    return (
        <section className="container flex flex-col gap-2">
            <SectionHeader id="sponsors">
                Sponsors
            </SectionHeader>

            <Sponsor
                href="https://www.zellic.io/"
                src="/assets/sponsors/zellic.svg"
                name="Zellic"
            >
                Zellic is a security research firm. We hire top CTF talent to solve the world's most critical security problems. We specialize in ZKPs, cryptography, web app security, smart contracts, and blockchain L1/L2s. Before Zellic, we previously founded perfect blue, the #1 CTF team in 2020 and 2021. You're a good fit for Zellic if you have extensive real-world experience in vulnerability research (VR) / binary exploitation, reverse engineering (RE), cryptography, or web application security. We hire internationally and offer competitive salaries and a comprehensive benefits package.
                <br />
                <br />
                To learn more about Zellic, check out our blog: <a href="https://www.zellic.io/blog/the-auditooor-grindset" target="_blank" rel="noopener noreferrer" className="text-theme-bright hover:underline">https://www.zellic.io/blog/the-auditooor-grindset</a>
                <br />
                Work at Zellic: <a href="mailto:jobs@zellic.io" className="text-theme-bright hover:underline">jobs@zellic.io</a> | @gf_256
            </Sponsor>

            <Sponsor
                href="https://osec.io/"
                src="/assets/sponsors/ottersec.svg"
                name="OtterSec"
            >
                OtterSec secures critical blockchain infrastructure — from custom compilers to novel virtual machines,
                we review a wide range of difficult targets. Our team consists largely of CTF players that enjoy solving
                hard problems. If that sounds like you, please apply through our <a href="https://osec.io/careers" target="_blank" rel="noopener noreferrer" className="text-theme-bright hover:underline">careers page</a>.
            </Sponsor>

            <Sponsor
                href="https://cloud.google.com/"
                src="/assets/sponsors/google-cloud.png"
                name="Google Cloud"
            >
                Infra sponsored by <a href="https://goo.gle/ctfsponsorship" target="_blank" rel="noopener noreferrer" className="text-theme-bright hover:underline">goo.gle/ctfsponsorship</a>.
            </Sponsor>

            <Sponsor
                href="https://www.cc-sw.com/"
                src="/assets/sponsors/caesar-creek.jpg"
                name="Caesar Creek Software"
            >
                Caesar Creek Software works with various government agencies to perform cyber research into major operating
                system platforms, software security products, personal computers, cell phones, networking equipment, and
                IoT devices. We specialize in offensive information operations, reverse engineering, vulnerability analysis,
                and exploit development. We have a robust Internal Research and Development program that lets us do cool
                stuff on our own. If it has a processor, we love taking it apart to see what makes it tick. We offer a
                highly competitive compensation package including one of the best benefit packages in Ohio and starting
                in 2019 we are an employee-owned company. U.S. citizenship is required for all positions, as well as the
                ability to obtain a high-level security clearance.
            </Sponsor>

            <Sponsor
                href="https://www.blackwired.com/"
                src="/assets/sponsors/blackwired_combined.png"
                name="Blackwired"
            >
                Blackwired's solutions are designed to shield what matters most to your organization. Our cyber
                solutions deliver enterprises, governments, and managed service providers an unparalleled balance of
                security and value. ThirdWatch, a Blackwired solution, provides an intuitive, real-time command center
                that maps Direct Threat Risk Management while consolidating and prioritizing attack vectors. Designed
                for rapid decision making, it transforms complex security data into a refined, actionable visual
                interface, ensuring you stay ahead of emerging threats with unmatched clarity and control. Unlike
                traditional security solutions that rely on intrusive scans or reactive measures, ThirdWatch monitors
                potential hazards in real-time, providing organizations with preventative and comprehensive 360° and 3D
                visualization of their risk exposure.
            </Sponsor>

            {/*
            <Sponsor
                href="https://www.cerias.purdue.edu/"
                src="/assets/sponsors/CERIAS.png"
                name="CERIAS"
            >
                The Center for Education and Research in Information Assurance and Security (CERIAS), a cross-cutting
                institute at Purdue University, is the world’s foremost interdisciplinary academic center for cyber and
                cyber-physical systems; more than a hundred researchers addressing issues of security, privacy, resiliency,
                trusted electronics, autonomy and explainable artificial intelligence. CERIAS brings together world-class
                faculty, students and industry partners to design, build and maintain trusted cyber/cyber-physical systems.
                CERIAS serves as an unbiased resource to the worldwide community.
            </Sponsor>
            */}
        </section>
    )
}
