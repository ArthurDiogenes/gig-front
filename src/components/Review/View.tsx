import { useQuery } from "@tanstack/react-query";
import { StarIcon as FilledStar } from "../../utils/icons"; // Estrela cheia personalizada
import { Star as EmptyStar } from "lucide-react"; // Estrela vazia
import api from "@/services/api";

type ViewReviewProps = {
  id: string;
};

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
};

export default function ViewReview({ id }: ViewReviewProps) {
  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await api.get<Review[]>(`bands/${id}/reviews`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch reviews");
      }
      return response.data;
    },
  });

  return (
    <section
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginTop: "16px",
        borderRadius: "8px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <div
            key={review.id}
            style={{
              paddingBottom: "16px",
              borderBottom:
                idx !== reviews.length - 1 ? "1px solid #eee" : "none",
              marginBottom: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(5)].map((_, index) => {
                  const size = 20;
                  return (
                    <div
                      key={index}
                      style={{
                        width: size,
                        height: size,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {index < review.rating ? (
                        <FilledStar style={{ width: size, height: size }} />
                      ) : (
                        <EmptyStar
                          style={{ width: size, height: size, color: "#ccc" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <p style={{ color: "#555", margin: 0 }}>"{review.comment}"</p>
              <span style={{ fontSize: 14, color: "#888" }}>
                – {review.user.name}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#888" }}>No reviews available.</p>
      )}
    </section>
  );
}
