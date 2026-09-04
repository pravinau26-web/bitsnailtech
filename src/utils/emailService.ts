import emailjs from '@emailjs/browser';

/**
 * Converts SVG markup into a high-resolution PNG Blob for email attachment.
 */
export async function getBitsnailLogoBlob(): Promise<Blob | null> {
  try {
    let svgContent = '';
    try {
      const res = await fetch('/assets/logo.svg');
      if (res.ok) {
        svgContent = await res.text();
      }
    } catch {
      // Fallback SVG string if fetch fails
    }

    if (!svgContent) {
      svgContent = `<svg viewBox="0 0 170 145" xmlns="http://www.w3.org/2000/svg">
        <rect width="170" height="145" fill="#163426" rx="16"/>
        <text x="85" y="80" text-anchor="middle" fill="#C59B3F" font-size="20" font-weight="bold" font-family="sans-serif">BITSNAIL</text>
        <text x="85" y="105" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">TECHNOLOGIES</text>
      </svg>`;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = window.URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 340;
          canvas.height = 290;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              window.URL.revokeObjectURL(blobURL);
              resolve(blob);
            }, 'image/png');
          } else {
            window.URL.revokeObjectURL(blobURL);
            resolve(null);
          }
        } catch {
          window.URL.revokeObjectURL(blobURL);
          resolve(null);
        }
      };

      img.onerror = () => {
        window.URL.revokeObjectURL(blobURL);
        resolve(null);
      };

      img.src = blobURL;
    });
  } catch (err) {
    console.error('Failed to create logo blob:', err);
    return null;
  }
}

export interface SubmissionPayload {
  type: 'career' | 'contact' | 'inquiry';
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  details: Record<string, string>;
  message?: string;
}

/**
 * Dispatches form submission via FormSubmit (with logo attachment)
 * and optionally via EmailJS if credentials are provided.
 */
export async function dispatchFormSubmission(payload: SubmissionPayload): Promise<{
  success: boolean;
  method: 'emailjs' | 'formsubmit';
  referenceId: string;
}> {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};
  const emailJsServiceId = metaEnv.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = metaEnv.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = metaEnv.VITE_EMAILJS_PUBLIC_KEY;

  // 1. Try EmailJS if configured
  if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          to_name: payload.name,
          to_email: payload.email,
          admin_email: 'pravinau26@gmail.com',
          admin_cc: 'bitsnailtech@gmail.com',
          reference_id: payload.referenceId,
          subject: payload.subject,
          phone: payload.phone,
          message: payload.message || '',
          ...payload.details,
          company_name: 'Bitsnail Technologies Pvt Ltd',
          company_logo: 'https://raw.githubusercontent.com/pravinau26-web/bitsnailtech/main/public/assets/logo.svg',
          company_website: 'https://pravinau26-web.github.io/',
          company_helpline: '+91 98416 00155',
        },
        emailJsPublicKey
      );

      return {
        success: true,
        method: 'emailjs',
        referenceId: payload.referenceId,
      };
    } catch (err) {
      console.warn('EmailJS dispatch failed, falling back to FormSubmit:', err);
    }
  }

  // 2. FormSubmit with attached PNG Logo (no raw URL text in table)
  const targetEmail = 'pravinau26@gmail.com';
  const formData = new FormData();

  // Attached official logo so it displays as an image attachment in Gmail
  const logoBlob = await getBitsnailLogoBlob();
  if (logoBlob) {
    formData.append('attachment', logoBlob, 'Bitsnail-Technologies-Official-Logo.png');
  }

  // Company Brand Data (Clean headers, NO raw URL link in table)
  formData.append('Organization', 'Bitsnail Technologies Pvt Ltd');
  formData.append('Helpline', '+91 98416 00155');
  formData.append('Official_Email', 'bitsnailtech@gmail.com');
  formData.append('Official_Website', 'https://pravinau26-web.github.io/');
  formData.append('Application_Ref', payload.referenceId);

  // User input fields
  formData.append('name', payload.name.trim());
  formData.append('email', payload.email.trim());
  formData.append('phone', payload.phone.trim());

  // Additional detail fields
  Object.entries(payload.details).forEach(([key, val]) => {
    formData.append(key, val);
  });

  if (payload.message) {
    formData.append('project_or_message', payload.message.trim());
  }

  // FormSubmit configuration
  formData.append('_subject', payload.subject);
  formData.append('_cc', 'bitsnailtech@gmail.com');
  formData.append('_replyto', payload.email.trim());
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    return {
      success: res.ok,
      method: 'formsubmit',
      referenceId: payload.referenceId,
    };
  } catch (err) {
    console.error('FormSubmit error:', err);
    return {
      success: false,
      method: 'formsubmit',
      referenceId: payload.referenceId,
    };
  }
}

/**
 * Creates a pre-filled mailto URL for candidate or client acknowledgment
 */
export function createAcknowledgmentMailtoUrl(
  userEmail: string,
  userName: string,
  referenceId: string,
  type: 'career' | 'contact' | 'inquiry',
  summary: string
): string {
  const subject = encodeURIComponent(
    `[Bitsnail Technologies] Official Acknowledgment Receipt: ${userName} (Ref: ${referenceId})`
  );

  const bodyContent = `============================================================
★ BITSNAIL TECHNOLOGIES PVT LTD ★
Telecom Network Operations & Field Engineering
Website: https://pravinau26-web.github.io/
Helpline: +91 98416 00155 | Official Desk: bitsnailtech@gmail.com
============================================================

Dear ${userName},

Thank you for contacting Bitsnail Technologies Pvt Ltd.
Your official ${type === 'career' ? 'Field Engineering Application' : 'Technical Inquiry'} has been recorded successfully.

ACKNOWLEDGMENT SUMMARY:
------------------------------------------------------------
• Reference ID : ${referenceId}
• Name         : ${userName}
• Email        : ${userEmail}
• Details      : ${summary}
• Status       : Official File Created & Queued for Engineering Review
------------------------------------------------------------

NEXT STEPS:
${
  type === 'career'
    ? '• Our telecom operations desk reviews candidate applications for upcoming field deployment batches.\n• Shortlisted candidates will be contacted via phone or email within 5 to 7 working days.'
    : '• Our RF & Telecom engineering operations team will review your project scope.\n• An engineering lead will contact you within 2 to 4 hours.'
}

If you need urgent assistance, call our operations lead at +91 98416 00155.

Sincerely,
Bitsnail Technologies Operations & HR Team
Chennai, Tamil Nadu, India
`;

  return `mailto:${userEmail}?cc=bitsnailtech@gmail.com&subject=${subject}&body=${encodeURIComponent(
    bodyContent
  )}`;
}
