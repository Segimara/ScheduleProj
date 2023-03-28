namespace BasicWebApi.Core.App.Common.Exceptions
{
	public class NotFoundException : Exception
    {
        public NotFoundException(string name, object key) : base($"Entity \"{name}\" ({key}) not found.") { }
    }
}
