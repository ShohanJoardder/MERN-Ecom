import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.png"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 style={{background: "#0c2461"}} className="p-2 text-white text-center">Privacy Policy</h1>
          <p>We have legal agreements for the production of our software, the way we present it on our websites and the protection of intellectual property — both yours and ours. In the sections below, you can see all the legal terms and policies for Ubuntu and Canonical.</p>
          <p>These terms and conditions cover both Ubuntu and Canonical. They govern the content of our websites, including things like the use of images and text.</p>
          <p>Your privacy is extremely important. Our privacy policy explains what data we collect from you via both our websites and our software — and what we do with it.</p>
          <p>Our intellectual property rights policy lets you use, modify and redistribute Ubuntu. It also outlines how you can use our trademarks, design assets and other copyrighted materials.</p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
