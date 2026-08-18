'use client';

import { useEffect } from 'react';

type ResumePreviewModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#071019] p-4" role="dialog" aria-modal="true">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 bg-white">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Resume preview</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Trey McGarity</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/Trey%20McGarity%20Resume.docx"
              download
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Download resume
            </a>
            <button
              onClick={onClose}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>

        <div className="overflow-y-auto bg-[#f6f7fb] p-4 sm:p-6">
          <div className="mx-auto max-w-3xl rounded-[20px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-2xl font-semibold text-slate-900">Trey McGarity</h3>
              <p className="text-sm font-medium text-slate-600">Software Developer</p>
              <p className="text-sm text-slate-500">ServiceNow Developer • Secret Clearance • Security+ • RMF & eMASS</p>
            </div>

            <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
              <section>
                <h4 className="text-base font-semibold uppercase tracking-[0.2em] text-slate-800">Professional Summary</h4>
                <p className="mt-2">
                  ServiceNow Developer with an active DoD Secret clearance, CompTIA Security+, RMF/eMASS experience, and five years of technical experience spanning full-stack development, enterprise database work, and IT operations. Building secure, role-based ServiceNow solutions for enterprise IT environments, including the Service Operations Workspace, ITSM application configuration, and a custom Marketing CSM application tailored to business needs in regulated settings.
                </p>
              </section>

              <section>
                <h4 className="text-base font-semibold uppercase tracking-[0.2em] text-slate-800">Certifications & Clearance</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Active U.S. Government Secret Clearance</li>
                  <li>CompTIA Security+</li>
                  <li>ServiceNow Certified System Administrator (CSA)</li>
                  <li>ServiceNow Certified Application Developer (CAD)</li>
                  <li>RMF (Risk Management Framework) & eMASS</li>
                </ul>
              </section>

              <section>
                <h4 className="text-base font-semibold uppercase tracking-[0.2em] text-slate-800">Technical Skills</h4>
                <p className="mt-2">
                  Languages: JavaScript (ES6+), Python, SQL, Java, C++. ServiceNow: Service Operations Workspace, ITSM application configuration, custom app development, ACLs, UI Builder, workflows, data models, and integrations. Frontend: React, Next.js, Redux, Tailwind, HTML/CSS. Backend & Data: Node.js, Express, Knex, PostgreSQL, SQL reporting & analytics, REST APIs, JWT/Auth. Security & Compliance: RMF, eMASS, IAM concepts, secure system design, ACL/role-based access. Platforms & Tools: Git, GitHub, Docker, Jira, Agile/Scrum, Azure, AWS fundamentals, Linux, Windows.
                </p>
              </section>

              <section>
                <h4 className="text-base font-semibold uppercase tracking-[0.2em] text-slate-800">Experience</h4>
                <div className="mt-2 space-y-4">
                  <div>
                    <p className="font-semibold text-slate-900">Junior Software Developer — TekSynap</p>
                    <p className="text-slate-500">Oct 2025 – Present</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Develop and support ServiceNow solutions for enterprise operations, including the Service Operations Workspace, ITSM application configuration, and custom workflow-driven enhancements.</li>
                      <li>Configure ACLs, UI Builder components, forms, and data models to enforce secure, role-based access and improve usability across ServiceNow applications.</li>
                      <li>Build and maintain a custom Marketing CSM application, supporting business workflows, table design, process automation, and operational reporting in a regulated environment.</li>
                      <li>Collaborate with architects and senior developers to analyze requirements, debug platform issues, and deliver scalable ServiceNow improvements.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Customer Support Representative — Carrier Corporation</p>
                    <p className="text-slate-500">Dec 2024 – Sep 2025</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Supported high-volume, time-sensitive operations by managing order workflows and technical inquiries using SAP.</li>
                      <li>Improved process efficiency through accurate data entry, issue triage, and system-level troubleshooting.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Engineering Support Associate — TPG Inc.</p>
                    <p className="text-slate-500">May 2021 – Dec 2024</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Built and maintained SQL-based reporting and analytics used by engineering and product teams.</li>
                      <li>Partnered with product and QA teams to track defects and support production releases across sprint planning and Jira workflows.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Helpdesk Analyst — Hexagon Safety & Infrastructure</p>
                    <p className="text-slate-500">Dec 2020 – May 2021</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Delivered Tier-1 support for mission-critical public safety software across Windows and Linux environments.</li>
                      <li>Resolved access, VPN, and authentication issues while maintaining strict uptime requirements.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-base font-semibold uppercase tracking-[0.2em] text-slate-800">Education</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Bachelor of Science, Computer Science — Colorado Technical University, March 2025</li>
                  <li>Full Stack Web Development Bootcamp — Bloom Institute of Technology, December 2021</li>
                  <li>Associate of Science, Computer Science — Motlow State Community College, May 2019</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
