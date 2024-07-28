import { useDocumentTitle, useScrollTop } from '@/hooks';


const FAQ = () => {
  useDocumentTitle('About | Alaya Arts');
  useScrollTop();

  return (
    <>
      <main>
        <div className="faq" style={{margin:"10px auto", padding:"4rem",width:"70%"}}>
        <h1 className="text-center fw-bold mb-4">FAQ</h1>
          <h2 className="fw-bold">How do I place an order?</h2>
          <h3>New Customers</h3>
          <p>
            Choose the product(s) you would like to order by selecting the correct size
            and clicking 'Add to Cart'. Upon finishing adding items to your cart,
            proceed to the ‘checkout’ and use one of the relevant checkout options.
            Simply follow the instructions to complete your secure online payment.
          </p>
          <h3>Existing/Returning Customers</h3>
          <p>
            ‘Log in’ to your existing account using your email address and password.
            Choose the product(s) you would like to order by selecting the correct size
            and clicking 'Add to Cart'. Upon finishing adding items to your cart,
            proceed to the ‘checkout’ and use one of the relevant checkout options.
            Simply follow the instructions to complete your secure online payment. Don’t
            forget to ‘sign out’ upon completing the shopping to ensure online security.
          </p>
          <p>
            Customers can also contact the ‘Customer Service Team’ at <span className="fw-bold">+92 348 8831990</span> to
            place an order over the phone.
          </p>
          <p>
            If you are experiencing problems whilst trying to place an order with us,
            please contact our ‘Customer Service Team’ at +92 348 8831990 for further
            assistance.
          </p>
          <h2 className="fw-bold">How do I register at the website?</h2>
          <p>
            New customers can register at the website using the email address and
            password of their choice.
          </p>
          <h2 className="fw-bold">Why do I need to register to shop?</h2>
          <p>
            We advise that registering with us is beneficial as it helps the customers:
          </p>
          <ul>
            <li>
              Remain informed about the special offers and discounts to avail them in
              time
            </li>
            <li>Keep track of their order(s) from confirmation to delivery</li>
          </ul>
          <p>
            If you do not have an email address to register with, then please call the
            ‘Customer Service Team’ at +92 348 8831990 to place the order over the
            phone.
          </p>
          <h2 className="fw-bold">How long will it take to get my order?</h2>
          <p>
            It's coming, we promise! We ship orders from Mondays till Saturdays, during
            office hours only. We do NOT operate on public holidays. We focus on
            shipping the order as quickly as possible (usually within 48 hours).
            However, due to unforeseen events sometimes delays do occur especially after
            releases. But we keep our customers informed at every step and appreciate
            their patience in this regard.
          </p>
          <p>
            Day deliveries are selected at the checkout and should be with you on the
            specified date. Delivery normally takes three to five (03-05) working days
            and you’ll have your parcel.
          </p>
          <h2 className="fw-bold">What if I forget my password?</h2>
          <p>
            You can request a ‘Password Reminder’ by clicking on 'Sign Up/Sign In' at
            the top of the page and entering your email address. Upon which you will
            receive an email with a link to reset your password.
          </p>
          <h2 className="fw-bold">Can I cancel my order?</h2>
          <p>
            Once orders are placed on website they are processed and dispatched very
            quickly. Unfortunately, once the order has been confirmed we will be unable
            to amend or cancel it and the respective order will be sent out to you. You
            will need to return the order in full for a refund.
          </p>
          <h2 className="fw-bold">I have received an incorrect item in my order, what do I do?</h2>
          <p>
            We aim to get your order right every time but we occasionally do fall prey
            to human error. Upon receiving an incorrect item, send it back to us and we
            will refund you or send you the correct item provided, we still have the
            product and size in stock.
          </p>
          <p>
            The customers can use the ‘Go to My Account’ option to obtain a returns
            number. We suggest you may want to re-order the item immediately as our
            stock does sell quickly and when the item is processed-shipped we may not
            have a similar item available.
          </p>
          <h2 className="fw-bold">There is an item missing from my order, what do I do?</h2>
          <p>
            Despite the fact that all our parcels are carefully checked before being
            dispatched for shipping, sometimes an item can be missed. In such a case the
            customers are suggested to get in contact with our ‘Customer Service Team’
            at +92 348 8831990
          </p>
          <p>
            We will then investigate the query, which may take us a few days and if
            necessary arrange for the item to be sent again. We recommend that you
            reorder the item as soon as possible to avoid disappointment as out stock
            does sell quickly.
          </p>
          <h2 className="fw-bold">What if my order does not arrive within the specified delivery time?</h2>
          <p>
            We try our best to deliver your parcel within the set time frame.
            Unfortunately, sometimes orders can be delayed due to unforeseen events or
            due to delays within the courier network or postal service. Other causes of
            delays include but are not limited to; public holidays, bad weather or
            custom delays for international shipments etc.
          </p>
          <p>
            If you experience a delay with your delivery and the specified time frame
            suggested has expired, then please contact the ‘Customer Service Team’ at
            +92 348 8831990
          </p>
          <p>
            You can also fill out the ‘Online Contact Form’, which will commence the
            investigation process to locate your order and provide tracking if possible.
            Please allow seven (07) working days for this investigation to be concluded.
          </p>
          <h2 className="fw-bold">How can I find items I want on the website?</h2>
          <p>
            Simply click on a ‘category’ at the top of the screen, then choose a
            ‘sub-category’ and browse the collection. Alternatively, use the 'search'
            link on the website and type in the product code or a description of the
            item you are looking for.
          </p>
        </div>
      </main>

    </>
  );
};
export default FAQ;
