import { useDocumentTitle, useScrollTop } from "@/hooks";

const FAQ = () => {
  useDocumentTitle("About | Alaya Arts");
  useScrollTop();

  return (
    <>
      <main className="content mt-5">
        <div
          className="privacy_policy"
         
        >
          <h1 className="text-center fw-bold mb-4">FAQ</h1>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How do I place an order?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <h3 className="fs-3 text-subtitle  fw-medium">New Customers</h3>
                  <p className="fs-3 text-subtitle  fw-medium">
                    Choose the product(s) you would like to order by selecting
                    the correct size and clicking 'Add to Cart'. Upon finishing
                    adding items to your cart, proceed to the ‘checkout’ and use
                    one of the relevant checkout options. Simply follow the
                    instructions to complete your secure online payment.
                  </p>
                  <h3 className="fs-3 text-subtitle  fw-medium">
                    Existing/Returning Customers
                  </h3>
                  <p className="fs-3 text-subtitle  fw-medium">
                    ‘Log in’ to your existing account using your email address
                    and password. Choose the product(s) you would like to order
                    by selecting the correct size and clicking 'Add to Cart'.
                    Upon finishing adding items to your cart, proceed to the
                    ‘checkout’ and use one of the relevant checkout options.
                    Simply follow the instructions to complete your secure
                    online payment. Don’t forget to ‘sign out’ upon completing
                    the shopping to ensure online security.
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    Customers can also contact the ‘Customer Service Team’ at{" "}
                    <span className="fw-bold">+92 348 8831990</span> to place an
                    order over the phone.
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    If you are experiencing problems whilst trying to place an
                    order with us, please contact our ‘Customer Service Team’ at
                    +92 348 8831990 for further assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How do I register at the website?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    New customers can register at the website using the email
                    address and password of their choice.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Why do I need to register to shop?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    We advise that registering with us is beneficial as it helps
                    the customers:
                  </p>
                  <ul className="fs-3 text-subtitle  fw-medium">
                    <li>
                      Remain informed about the special offers and discounts to
                      avail them in time
                    </li>
                    <li>
                      Keep track of their order(s) from confirmation to delivery
                    </li>
                  </ul>
                  <p className="fs-3 text-subtitle  fw-medium">
                    If you do not have an email address to register with, then
                    please call the ‘Customer Service Team’ at +92 348 8831990
                    to place the order over the phone.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  How long will it take to get my order?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    It's coming, we promise! We ship orders from Mondays till
                    Saturdays, during office hours only. We do NOT operate on
                    public holidays. We focus on shipping the order as quickly
                    as possible (usually within 48 hours). However, due to
                    unforeseen events sometimes delays do occur especially after
                    releases. But we keep our customers informed at every step
                    and appreciate their patience in this regard.
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    Day deliveries are selected at the checkout and should be
                    with you on the specified date. Delivery normally takes
                    three to five (03-05) working days and you’ll have your
                    parcel.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  What if I forget my password?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    You can request a ‘Password Reminder’ by clicking on 'Sign
                    Up/Sign In' at the top of the page and entering your email
                    address. Upon which you will receive an email with a link to
                    reset your password.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  Can I cancel my order?
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    Once orders are placed on website they are processed and
                    dispatched very quickly. Unfortunately, once the order has
                    been confirmed we will be unable to amend or cancel it and
                    the respective order will be sent out to you. You will need
                    to return the order in full for a refund.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingSeven">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="false"
                  aria-controls="collapseSeven"
                >
                  I have received an incorrect item in my order, what do I do?
                </button>
              </h2>
              <div
                id="collapseSeven"
                className="accordion-collapse collapse"
                aria-labelledby="headingSeven"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    We aim to get your order right every time but we
                    occasionally do fall prey to human error. Upon receiving an
                    incorrect item, send it back to us and we will refund you or
                    send you the correct item provided, we still have the
                    product and size in stock.
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    The customers can use the ‘Go to My Account’ option to
                    obtain a returns number. We suggest you may want to re-order
                    the item immediately as our stock does sell quickly and when
                    the item is processed-shipped we may not have a similar item
                    available.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingEight">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEight"
                  aria-expanded="false"
                  aria-controls="collapseEight"
                >
                  There is an item missing from my order, what do I do?
                </button>
              </h2>
              <div
                id="collapseEight"
                className="accordion-collapse collapse"
                aria-labelledby="headingEight"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    Despite the fact that all our parcels are carefully checked
                    before being dispatched for shipping, sometimes an item can
                    be missed. In such a case the customers are suggested to get
                    in contact with our ‘Customer Service Team’ at +92 348
                    8831990
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    We will then investigate the query, which may take us a few
                    days and if necessary arrange for the item to be sent again.
                    We recommend that you reorder the item as soon as possible
                    to avoid disappointment as our stock does sell quickly.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header" id="headingNine">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseNine"
                  aria-expanded="false"
                  aria-controls="collapseNine"
                >
                  What if my order does not arrive within the specified delivery
                  time?
                </button>
              </h2>
              <div
                id="collapseNine"
                className="accordion-collapse collapse"
                aria-labelledby="headingNine"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    We try our best to deliver your parcel within the set time
                    frame. Unfortunately, sometimes orders can be delayed due to
                    unforeseen events or due to delays within the courier
                    network or postal service. Other causes of delays include
                    but are not limited to; public holidays, bad weather or
                    custom delays for international shipments etc.
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    If you experience a delay with your delivery and the
                    specified time frame suggested has expired, then please
                    contact the ‘Customer Service Team’ at +92 348 8831990
                  </p>
                  <p className="fs-3 text-subtitle  fw-medium">
                    You can also fill out the ‘Online Contact Form’, which will
                    commence the investigation process to locate your order and
                    provide tracking if possible. Please allow seven (07)
                    working days for this investigation to be concluded.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item mb-3">
              <h2 className="accordion-header " id="headingTen">
                <button
                  className="accordion-button collapsed fs-2 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTen"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                >
                  How can I find items I want on the website?
                </button>
              </h2>
              <div
                id="collapseTen"
                className="accordion-collapse collapse"
                aria-labelledby="headingTen"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p className="fs-3 text-subtitle  fw-medium">
                    Simply click on a ‘category’ at the top of the screen, then
                    choose a ‘sub-category’ and browse the collection.
                    Alternatively, use the 'search' link on the website and type
                    in the product code or a description of the item you are
                    looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default FAQ;
