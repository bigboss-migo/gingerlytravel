"use client";

import type { FormEvent } from "react";

const INTERESTS: [string, string][] = [
  ["Cruise", "Cruise"],
  ["Flights", "Flights"],
  ["All-inclusive resort", "All-inclusive"],
  ["Group trip", "Group trip"],
  ["Tour / excursion", "Tours"],
  ["Event / celebration", "Event"],
  ["Real estate", "Real estate"],
  ["Something else", "Something else"],
];

type Props = {
  toEmail: string;
  heading: string;
  intro: string;
  submitLabel: string;
  finePrint: string;
};

export default function ContactForm({ toEmail, heading, intro, submitLabel, finePrint }: Props) {
  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const n = v("n");
    const e = v("e");
    if (!n || !e) {
      alert("Please add your name and email so Lynette can reply.");
      return;
    }
    const ints = f.getAll("i").join(", ");
    const body =
      "Hello Lynette,\n\nName: " + n +
      "\nEmail: " + e +
      "\nPhone: " + v("p") +
      "\nTravelers: " + v("t") +
      "\nInterested in: " + (ints || "Not specified") +
      "\nDestination: " + v("d") +
      "\nTravel dates: " + v("w") +
      "\n\nMessage:\n" + v("m") +
      "\n\nSent from the Pilgrim\u2019s Progress website.";
    window.location.href =
      "mailto:" + toEmail +
      "?subject=" + encodeURIComponent("Travel inquiry from " + n) +
      "&body=" + encodeURIComponent(body);
  }

  return (
    <form className="q rv d1" id="qform" noValidate onSubmit={onSubmit}>
      <h3>{heading}</h3>
      <p className="fine" style={{ margin: 0 }}>{intro}</p>
      <div className="grid">
        <div>
          <label htmlFor="n">Name</label>
          <input id="n" name="n" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="e">Email</label>
          <input id="e" name="e" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="p">Phone</label>
          <input id="p" name="p" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="t">Travelers</label>
          <input id="t" name="t" placeholder="e.g. 2 adults, or group of 12" />
        </div>
        <div className="full">
          <label>I&rsquo;m interested in</label>
          <div className="chips">
            {INTERESTS.map(([value, text]) => (
              <label key={value}>
                <input type="checkbox" name="i" value={value} />
                <span>{text}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="d">Destination</label>
          <input id="d" name="d" placeholder="Jamaica, Turkey, Africa and..." />
        </div>
        <div>
          <label htmlFor="w">Travel dates</label>
          <input id="w" name="w" placeholder="Month or exact dates" />
        </div>
        <div className="full">
          <label htmlFor="m">Message</label>
          <textarea id="m" name="m" placeholder="Tell me about your dream trip and .." />
        </div>
        <div className="full">
          <button className="btn primary lg" type="submit" style={{ width: "100%" }}>
            {submitLabel}
          </button>
        </div>
      </div>
      <p className="fine">{finePrint}</p>
    </form>
  );
}
