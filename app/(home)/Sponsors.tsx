import Sponsor from '@/app/(home)/Sponsor';

export default function Sponsors() {
    return (
        <div className="container flex flex-col gap-2">
            <h2 className="font-bold text-2xl mb-3">
                Sponsors
            </h2>

            <Sponsor href="/assets/sponsors/zellic.svg" name="Zellic">
                Zellic is a security research firm. We hire top CTF talent to solve the world's most critical security problems. We specialize in ZKPs, cryptography, web app security, smart contracts, and blockchain L1/L2s. Before Zellic, we previously founded perfect blue, the #1 CTF team in 2020 and 2021. You're a good fit for Zellic if you have extensive real-world experience in vulnerability research (VR) / binary exploitation, reverse engineering (RE), cryptography, or web application security. We hire internationally and offer competitive salaries and a comprehensive benefits package.
                <br />
                <br />
                To learn more about Zellic, check out our blog: <a href="https://www.zellic.io/blog/the-auditooor-grindset" target="_blank" rel="noopener noreferrer" className="text-theme-bright hover:underline">https://www.zellic.io/blog/the-auditooor-grindset</a>
                <br />
                Work at Zellic: <a href="mailto:jobs@zellic.io" className="text-theme-bright hover:underline">jobs@zellic.io</a> | @gf_256
            </Sponsor>

            <Sponsor href="/assets/sponsors/caesar-creek.jpg" name="Caesar Creek Software">
                Caesar Creek Software provides cyber research and development services to the Federal government.
                We pride ourselves in offering high-quality services at a reasonable price and with the highest ethical
                standards. You can be safe with Caesar Creek Software on your team!
            </Sponsor>

            <Sponsor href="/assets/sponsors/CERIAS.png" name="CERIAS">
                The Center for Education and Research in Information Assurance and Security (CERIAS), a cross-cutting
                institute at Purdue University, is the world’s foremost interdisciplinary academic center for cyber and
                cyber-physical systems; more than a hundred researchers addressing issues of security, privacy, resiliency,
                trusted electronics, autonomy and explainable artificial intelligence. CERIAS brings together world-class
                faculty, students and industry partners to design, build and maintain trusted cyber/cyber-physical systems.
                CERIAS serves as an unbiased resource to the worldwide community.
            </Sponsor>
        </div>
    )
}
