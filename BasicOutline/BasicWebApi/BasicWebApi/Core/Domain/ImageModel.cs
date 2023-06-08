namespace BasicWebApi.Core.Domain
{
    public class ImageModel
    {
        public Guid Id { get; set; }
        public byte[] Bytes { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public decimal Size { get; set; }
        public Guid EventId { get; set; }
        public EventModel Event { get; set; }
    }
}
