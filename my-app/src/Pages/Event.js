import { useParams } from "react-router-dom";
import { database } from "../Database/database";
import { useData } from "../Contexts/DataProvider";

export const Event = () => {
  const { eventId } = useParams();
  const { showRSVP, setShowRSVP } = useData();
  const findEvent = database.meetups.find((event) => event.id === eventId);
  return (
    <div className="single-event">
      <div className="main-info">
        <h1>{findEvent?.title}</h1>
        <p>
          Hosted By: <strong>{findEvent?.hostedBy}</strong>
        </p>
        <img src={findEvent?.eventThumbnail} alt={findEvent?.title} />
        <h2>Details:</h2>
        <p className="details">{findEvent?.eventDescription}</p>
        <h2>Additional Information:</h2>
        <p>Dress code: {findEvent?.additionalInformation?.dressCode}</p>
        <p>
          Age Restrictions: {findEvent?.additionalInformation?.ageRestrictions}
        </p>
        <h2>Event Tags:</h2>
        {findEvent?.eventTags?.map((tag) => (
          <p className="event-tag">{tag}</p>
        ))}
      </div>
      <div>
        <div>
          <p>
            {findEvent?.eventStartTime} to {findEvent?.eventEndTime}
          </p>
          <p>{findEvent?.address}</p>
          <p>₹ {findEvent?.price}</p>
        </div>
        {findEvent.speakers.length ? (
          <div className="speakers">
            <h2>Speakers:</h2>
            {findEvent?.speakers?.map(({ name, image, designation }) => (
              <div>
                <img src={image} alt={name} />
                <p>{name}</p>
                <p>{designation}</p>
              </div>
            ))}
          </div>
        ) : null}
        <button onClick={() => setShowRSVP(true)}>
          {findEvent?.rsvp ? "Already RSVPed" : "RSVP"}
        </button>
      </div>
      {showRSVP && !findEvent?.rsvp && <rsvp eventId={findEvent?.id} />}
    </div>
  );
};