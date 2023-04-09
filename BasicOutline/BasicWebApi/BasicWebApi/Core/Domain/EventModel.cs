using BasicWebApi.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Core.Domain
{
    public class EventModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priotity { get; set; }
        public DateTime Timestamp { get; set; }
        public State State { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        //public List<ImageModel> Images { get; set; }
    }
}
