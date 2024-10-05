// Copyright (c) 2024 Xinzhe Wang
// SPDX-License-Identifier: MIT

use std::fmt::Display;

use actix_web::middleware;

#[allow(dead_code)]
#[derive(Clone, Debug)]
pub enum RefererPolicy {
    NoReferrer,
    NoReferrerWhenDowngrade,
    Origin,
    OriginWhenCrossOrigin,
    SameOrigin,
    StrictOrigin,
    StrictOriginWhenCrossOrigin,
    UnsafeUrl,
}

impl Display for RefererPolicy {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            RefererPolicy::NoReferrer => "no-referrer",
            RefererPolicy::NoReferrerWhenDowngrade => "no-referrer-when-downgrade",
            RefererPolicy::Origin => "origin",
            RefererPolicy::OriginWhenCrossOrigin => "origin-when-cross-origin",
            RefererPolicy::SameOrigin => "same-origin",
            RefererPolicy::StrictOrigin => "strict-origin",
            RefererPolicy::StrictOriginWhenCrossOrigin => "strict-origin-when-cross-origin",
            RefererPolicy::UnsafeUrl => "unsafe-url",
        })
    }
}

#[allow(dead_code)]
#[derive(Clone, Debug)]
pub enum XFrameOptions {
    Deny,
    SameOrigin,
}

impl Display for XFrameOptions {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            XFrameOptions::Deny => "DENY",
            XFrameOptions::SameOrigin => "SAMEORIGIN",
        })
    }
}

#[allow(dead_code)]
#[derive(Clone, Debug)]
pub enum XXSSProtection {
    Disable,
    Enable,
    EnableBlock,
    EnableReport(String),
}

impl Display for XXSSProtection {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            XXSSProtection::Disable => f.write_str("0"),
            XXSSProtection::Enable => f.write_str("1"),
            XXSSProtection::EnableBlock => f.write_str("1; mode=block"),
            XXSSProtection::EnableReport(x) => f.write_str(&format!("1; report={}", x)),
        }
    }
}

#[allow(dead_code)]
#[derive(Clone, Debug)]
pub enum CrossOriginOpenerPolicy {
    UnsafeNone,
    SameOriginAllowPopups,
    SameOrigin,
}

impl Display for CrossOriginOpenerPolicy {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            CrossOriginOpenerPolicy::UnsafeNone => "unsafe-none",
            CrossOriginOpenerPolicy::SameOriginAllowPopups => "same-origin-allow-popups",
            CrossOriginOpenerPolicy::SameOrigin => "same-origin",
        })
    }
}

#[derive(Clone, Debug)]
pub struct SecurityHeader {
    pub referer_policy: RefererPolicy,
    pub x_frame_options: XFrameOptions,
    pub x_xss_protection: XXSSProtection,
    pub cross_origin_opener_policy: CrossOriginOpenerPolicy,
    pub content_security_policy: String,
}

impl Default for SecurityHeader {
    fn default() -> Self {
        Self {
            referer_policy: RefererPolicy::StrictOriginWhenCrossOrigin,
            x_frame_options: XFrameOptions::Deny,
            x_xss_protection: XXSSProtection::EnableBlock,
            cross_origin_opener_policy: CrossOriginOpenerPolicy::SameOrigin,
            content_security_policy: String::from("default-src 'none'; script-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"),
        }
    }
}

impl SecurityHeader {
    pub fn build(self) -> middleware::DefaultHeaders {
        middleware::DefaultHeaders::new()
            .add(("X-Content-Type-Options", "nosniff"))
            .add(("Referrer-Policy", self.referer_policy.to_string()))
            .add(("X-Frame-Options", self.x_frame_options.to_string()))
            .add(("X-XSS-Protection", self.x_xss_protection.to_string()))
            .add((
                "Cross-Origin-Opener-Policy",
                self.cross_origin_opener_policy.to_string(),
            ))
            .add(("Content-Security-Policy", self.content_security_policy))
    }
}
