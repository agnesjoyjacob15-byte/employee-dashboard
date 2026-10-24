import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle2, FileUser, Info, RotateCcw } from 'lucide-react';

const empty = { name: '', designation: '', location: '', salary: '' };
const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

export default function EmployeeForm() {
  const [form, setForm] = useState(empty);
  const [preview, setPreview] = useState(null);

  function change(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setPreview(null);
  }

  function submit(event) {
    event.preventDefault();
    setPreview({ name: form.name.trim(), designation: form.designation.trim(), location: form.location.trim(), salary: Number(form.salary) });
  }

  return (
    <>
      <Link className="back-link" to="/"><ArrowLeft size={14} aria-hidden="true" />Back to dashboard</Link>
      <section className="page-heading form-page-heading"><div><p className="eyebrow">A NEW INTRODUCTION</p><h1>Employee Form<span>.</span></h1><p className="page-subtitle">Let’s start with the little details that matter.</p></div></section>
      <div className="form-layout">
        <section className="panel form-panel" aria-labelledby="form-title"><div className="form-panel-title"><span className="form-title-icon"><FileUser size={22} aria-hidden="true" /></span><div><h2 id="form-title">Employee details</h2><p>All fields are required.</p></div></div>
          <form onSubmit={submit} onReset={() => { setForm(empty); setPreview(null); }}>
            <div className="row g-4">
              <div className="col-12"><label className="form-label" htmlFor="name">Name <span aria-hidden="true">*</span></label><input className="form-control" id="name" name="name" required maxLength={100} pattern=".*\S.*" title="Enter a name containing a non-space character." placeholder="Enter full name" autoComplete="name" value={form.name} onChange={change} /></div>
              <div className="col-12"><label className="form-label" htmlFor="designation">Designation <span aria-hidden="true">*</span></label><input className="form-control" id="designation" name="designation" required maxLength={100} pattern=".*\S.*" title="Enter a designation containing a non-space character." placeholder="e.g. Web Developer" autoComplete="organization-title" value={form.designation} onChange={change} /></div>
              <div className="col-sm-6"><label className="form-label" htmlFor="location">Location <span aria-hidden="true">*</span></label><input className="form-control" id="location" name="location" required maxLength={100} pattern=".*\S.*" title="Enter a location containing a non-space character." placeholder="e.g. Kochi" autoComplete="address-level2" value={form.location} onChange={change} /></div>
              <div className="col-sm-6"><label className="form-label" htmlFor="salary">Salary <span aria-hidden="true">*</span></label><div className="input-group"><span className="input-group-text">₹</span><input className="form-control" id="salary" name="salary" type="number" required min="0" max="9999999999" step="0.01" placeholder="e.g. 40000" aria-describedby="salary-help" value={form.salary} onChange={change} /></div><div className="form-text" id="salary-help">Monthly salary in INR.</div></div>
            </div>
            <div className="form-actions"><button className="btn btn-outline-secondary" type="reset"><RotateCcw size={14} aria-hidden="true" />Reset</button><button className="btn btn-primary" type="submit">Preview employee <ArrowRight size={16} aria-hidden="true" /></button></div>
          </form>
          {preview ? <section className="preview-panel" role="status" aria-label="Employee preview"><h3><CheckCircle2 size={18} aria-hidden="true" />Your employee preview</h3><dl><div><dt>Name</dt><dd>{preview.name}</dd></div><div><dt>Designation</dt><dd>{preview.designation}</dd></div><div><dt>Location</dt><dd>{preview.location}</dd></div><div><dt>Monthly salary</dt><dd>{money.format(preview.salary)}</dd></div></dl><p>Preview only. Nothing has been saved or sent to an API.</p></section> : null}
        </section>
        <aside className="form-aside"><div className="profile-illustration" aria-hidden="true"><span className="illustration-head" /><span className="illustration-body" /><i /><i /><i /></div><p className="eyebrow">PEOPLE, THOUGHTFULLY</p><h2>A few details.<br />A familiar face.</h2><p>From what someone does to where they work, the essentials help us feel a little more connected.</p><div className="aside-notice"><Info size={18} aria-hidden="true" /><p>This form is a frontend demonstration. Preview details in your browser; no information is posted or added to the employee directory.</p></div></aside>
      </div>
    </>
  );
}
